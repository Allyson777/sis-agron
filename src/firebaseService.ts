import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

import { db } from './firebaseConfig'

export interface ContaBancaria {
  agencia: number
  nomeBanco: string
  numBanco: number
  numConta: number
}

export interface FontePagadora {
  id?: string
  nome: string
  numDocUnico: string //cpf ou cnpj
  contas: ContaBancaria[] // array de contas
}

export interface NFe {
  id?: string //pd conter valor ou undefined
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

const nfeCollection = collection(db, 'nfe')

//crud NFe

export const addNfe = async (dados: NFe): Promise<string> => {
  const docRef = await addDoc(nfeCollection, dados)
  return docRef.id
}

export const getNFes = async (): Promise<NFe[]> => {
  const snapshot = await getDocs(nfeCollection)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as NFe)
}

export const updateNFe = async (id: string, novosDados: Partial<NFe>) => {
  const docRef = doc(db, 'nfe', id)
  await updateDoc(docRef, novosDados)
}

export const deleteNfe = async (id: string) => {
  const docRef = doc(db, 'nfe', id)
  await deleteDoc(docRef)
}
