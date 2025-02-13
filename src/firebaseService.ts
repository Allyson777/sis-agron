import { initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

export interface ContaBancaria {
  agencia: number
  nomeBanco: string
  numBanco: number
  numConta: number
}

export interface FontePagadora {
  id?: string
  nome: string
  numDocUnico: number //cpf ou cnpj
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

const fontePagadoraCollection = collection(db, 'fonte-pagadora')

const nfeCollection = collection(db, 'nfe')

//crud

export const addFontePagadora = async (dados: FontePagadora): Promise<string> => {
  const docRef = await addDoc(fontePagadoraCollection, dados)
  return docRef.id
}

export const getFontesPagadoras = async (): Promise<FontePagadora[]> => {
  const snapshot = await getDocs(fontePagadoraCollection)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as FontePagadora)
}

export const updateFontePagadora = async (id: string, novosDados: Partial<FontePagadora>) => {
  const docRef = doc(db, 'fonte-pagadora', id)
  await updateDoc(docRef, novosDados)
}

export const deleteFontePagadora = async (id: string) => {
  const docRef = doc(db, 'fonte-pagadora', id)
  await deleteDoc(docRef)
}

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
