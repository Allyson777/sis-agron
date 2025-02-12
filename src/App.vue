<template>
  <router-view />
</template>

<script lang="ts">
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from './firebaseConfig'
export default {
  async mounted() {
    // Adicionar um documento de teste
    try {
      await addDoc(collection(db, 'teste'), {
        nome: 'Teste de Firestore',
        criadoEm: new Date(),
      })
      console.log('Documento adicionado!')
    } catch (error) {
      console.error('Erro ao adicionar documento:', error)
    }

    // Buscar documentos
    const querySnapshot = await getDocs(collection(db, 'teste'))
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
    })
  },
}
</script>
