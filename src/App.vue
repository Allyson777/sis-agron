<template>
  <router-view />
</template>

<script lang="ts">
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebaseConfig'
export default {
  async mounted() {
    const querySnapshot = await getDocs(collection(db, 'teste'))
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
    })
  },
}
</script>
