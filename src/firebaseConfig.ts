import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA4ZG36QtPIrkz8gZMz-iRekxGoEcQBQmE',
  authDomain: 'sis-agron1.firebaseapp.com',
  projectId: 'sis-agron1',
  storageBucket: 'sis-agron1.firebasestorage.app',
  messagingSenderId: '841569083698',
  appId: '1:841569083698:web:3a776c0f2e731d75c5772b',
}

// Inicializa o Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Inicializa o Firestore
const db = getFirestore(firebaseApp)

export { db }
