import { onSchedule } from 'firebase-functions/v2/scheduler'
import * as admin from 'firebase-admin'
import axios from 'axios'

admin.initializeApp()

// Chave da API da Nuvem Fiscal
const API_KEY = 'SUA_CHAVE_DA_API_AQUI'

interface NFe {
  chaveAcesso: string
  destinatarioRemetente: string
  emisor: string
  valorTotal: number
  dtEmissao: { time: string }
  dtEntradaSaida: { time: string }
}

// Função que será executada periodicamente
export const verificarNovasNFes = onSchedule('every 5 minutes', async () => {
  try {
    // Busca todas as fontes pagadoras cadastradas
    const fontesPagadoras = await admin.firestore().collection('fonte-pagadora').get()

    // Itera sobre cada fonte pagadora
    for (const fonte of fontesPagadoras.docs) {
      const cpfCnpj = fonte.data().numDocUnico as string

      // Busca as NFes vinculadas ao CPF/CNPJ da fonte pagadora
      const nfes = await buscarNFesPorCpfCnpj(cpfCnpj)

      for (const nfe of nfes) {
        // Verifica se a NFe já existe no Firestore
        const nfeExistente = await admin
          .firestore()
          .collection('nfe')
          .where('chaveAcesso', '==', nfe.chaveAcesso)
          .get()

        // Se a NFe não existir, adiciona ao Firestore
        if (nfeExistente.empty) {
          await admin.firestore().collection('nfe').add(nfe)
          console.log(`NFe ${nfe.chaveAcesso} adicionada para a fonte pagadora ${cpfCnpj}`)
        }
      }
    }

    console.log('Verificação de NFes concluída com sucesso!')
  } catch (error) {
    console.error('Erro ao verificar NFes:', error)
  }
})

// Função para buscar NFes na API da Nuvem Fiscal
const buscarNFesPorCpfCnpj = async (cpfCnpj: string): Promise<NFe[]> => {
  const response = await axios.get('https://api.nuvemfiscal.com.br/v1/nfe', {
    params: { cpfCnpj },
    headers: { Authorization: `Bearer ${API_KEY}` },
  })
  return response.data as NFe[]
}
