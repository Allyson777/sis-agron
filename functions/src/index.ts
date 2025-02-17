import { onSchedule } from 'firebase-functions/v2/scheduler'
import * as admin from 'firebase-admin'
import axios from 'axios'
import { logger } from 'firebase-functions'
admin.initializeApp()

const TESTE_CNPJ = '00594457000148'
interface NFe {
  id?: string
  anexos: string[]
  arquivoEspelho: string
  chaveAcesso: string
  destinatarioRemetente: string
  dtEmissao: { time: string }
  dtEntradaSaida: { time: string }
  emissor: string
  malote: string
  noNFe: number
  tags: string[]
  tipo: string
  valorTotal: number
}
const API_KEY = process.env.NUVEM_FISCAL_API_KEY
if (!API_KEY) {
  logger.error('❌ ERRO: Chave da API da Nuvem Fiscal não definida.')
}
const buscarNFesPorCpfCnpj = async (cpfCnpj: string = TESTE_CNPJ): Promise<NFe[]> => {
  try {
    const response = await axios.get('https://api.nuvemfiscal.com.br/v1/nfe', {
      params: { cpfCnpj },
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
    return response.data as NFe[]
  } catch (error) {
    logger.error(`Erro ao buscar NFes para CPF/CNPJ ${cpfCnpj}:`, error)
    return []
  }
}

export const verificarNovasNFes = onSchedule('*/5 * * * *', async () => {
  logger.info('Iniciando verificação de NFes...')

  try {
    const fontesPagadorasSnapshot = await admin.firestore().collection('fonte-pagadora').get()

    if (fontesPagadorasSnapshot.empty) {
      logger.warn('Nenhuma fonte pagadora cadastrada.')
      return
    }

    const batch = admin.firestore().batch()
    let novasNFesCount = 0

    for (const fonte of fontesPagadorasSnapshot.docs) {
      const cpfCnpj = fonte.data().numDocUnico as string
      const nfes = await buscarNFesPorCpfCnpj(cpfCnpj)

      for (const nfe of nfes) {
        const nfeRef = admin.firestore().collection('nfe').doc(nfe.chaveAcesso)
        const nfeSnapshot = await nfeRef.get()

        if (!nfeSnapshot.exists) {
          batch.set(nfeRef, nfe)
          novasNFesCount++
        }
      }
    }

    if (novasNFesCount > 0) {
      await batch.commit()
      logger.info(`Foram adicionadas ${novasNFesCount} novas NFes.`)
    } else {
      logger.info('Nenhuma nova NFe encontrada.')
    }
  } catch (error) {
    logger.error('Erro ao verificar NFes:', error)
  }
})
