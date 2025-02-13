import axios from 'axios'

export interface NotaFiscal {
  anexos: string[]
  arquivoEspelho: string
  chaveAcesso: string
  destinatarioRemetente: string
  dtEmissao: {
    __time__: string
  }
  dtEntradaSaida: {
    __time__: string
  }
  emisor: string
  malote: string
  noNfe: number
  serieNfe: number
  tags: string[]
  tipo: string
  valorTotal: number
}

const API_KEY = process.env.VUE_APP_NUVEM_FISCAL_API_KEY
const BASE_URL = 'https://api.nuvemfiscal.com.br/v1'

export const buscarNFes = async (cpfCnpj: string): Promise<NotaFiscal[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/nfe`, {
      params: { cpfCnpj },
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
    return response.data
  } catch (error) {
    console.error('Erro ao buscar NFes:', error)
    return []
  }
}

export const buscarNFesPorCpfCnpj = buscarNFes
