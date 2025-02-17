import axios from 'axios'

const CLIENT_ID = 'pzyCZTl0zctPmlNX4Ezz' // Substitua pelo seu Client ID
const CLIENT_SECRET = 'dNHKFicVPL3ovI0ND4Wbvy0ATalqHYEexOEvg8Px' // Substitua pelo seu Client Secret
const TOKEN_URL = 'https://auth.nuvemfiscal.com.br/oauth/token'
const BASE_URL = 'https://api.nuvemfiscal.com.br/v1'

// Define um tipo mais preciso para a resposta da API
interface NFeResponse {
  chaveAcesso: string
  anexos: string[]
  arquivoEspelho: string
  destinatarioRemetente: string
  dtEmissao: { __time__: string }
  dtEntradaSaida: { __time__: string }
  emisor: string
  malote: string
  noNfe: number
  serieNfe: number
  tags: string[]
  tipo: string
  valorTotal: number
}

export interface NotaFiscal {
  anexos: string[]
  arquivoEspelho: string
  chaveAcesso: string
  destinatarioRemetente: string
  dtEmissao: { __time__: string }
  dtEntradaSaida: { __time__: string }
  emisor: string
  malote: string
  noNfe: number
  serieNfe: number
  tags: string[]
  tipo: string
  valorTotal: number
}

export const getAccessToken = async (): Promise<string> => {
  try {
    const response = await axios.post(
      TOKEN_URL,
      `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&scope=nfe`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )

    return response.data.access_token
  } catch (error) {
    console.error('Erro ao obter token de acesso:', error)
    throw error
  }
}

// Função de busca de NF-es
export const buscarNFes = async (
  cpfCnpj: string = '99999999000191', // CNPJ da imagem
  ambiente: 'homologacao' | 'producao' = 'producao',
  top: number = 10,
  skip: number = 0,
): Promise<NotaFiscal[]> => {
  try {
    const accessToken = await getAccessToken()
    console.log('Token de Acesso:', accessToken)

    const response = await axios.get(`${BASE_URL}/nfe`, {
      params: { cpf_cnpj: cpfCnpj, ambiente, $top: top, $skip: skip },
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    console.log('Resposta da API:', response.data)

    if (response.data && response.data.data) {
      return response.data.data.map((item: NFeResponse) => ({
        anexos: item.anexos || [],
        arquivoEspelho: item.arquivoEspelho || '',
        chaveAcesso: item.chaveAcesso,
        destinatarioRemetente: item.destinatarioRemetente,
        dtEmissao: item.dtEmissao || { __time__: '' },
        dtEntradaSaida: item.dtEntradaSaida || { __time__: '' },
        emisor: item.emisor,
        malote: item.malote,
        noNfe: item.noNfe,
        serieNfe: item.serieNfe,
        tags: item.tags || [],
        tipo: item.tipo,
        valorTotal: item.valorTotal || 0,
      }))
    } else {
      console.error('Nenhuma nota fiscal encontrada.')
      return []
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao buscar NFes:', error.response?.data || error.message)
    } else {
      console.error('Erro inesperado:', error)
    }
    return []
  }
}

// Função para emitir uma nova Nota Fiscal
export const emitirNFe = async () => {
  try {
    const accessToken = await getAccessToken()

    const nfeData = {
      ambiente: 'homologacao', // ou 'producao' caso queira emitir para ambiente real
      natureza_operacao: 'Venda de Mercadoria',
      cliente: {
        cpf_cnpj: '99999999000191', // CNPJ da imagem
        nome: 'Cliente Exemplo',
        email: 'cliente@exemplo.com',
        endereco: {
          logradouro: 'Rua Teste',
          numero: '123',
          bairro: 'Centro',
          cidade: 'São Mateus',
          uf: 'ES',
          cep: '29945555',
        },
      },
      itens: [
        {
          descricao: 'Produto Teste',
          quantidade: 1,
          valor_unitario: 100.0,
          valor_total: 100.0,
          ncm: '61091000',
          cfop: '5102',
        },
      ],
      valor_total: 100.0,
    }

    const response = await axios.post(`${BASE_URL}/nfe`, nfeData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    console.log('Nota Fiscal Emitida:', response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao emitir NFe:', error.response?.data || error.message)
    } else {
      console.error('Erro inesperado:', error)
    }
    throw error
  }
}
