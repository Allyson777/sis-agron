import { collection, getDocs } from 'firebase/firestore'
import { db } from 'src/firebaseConfig'
import type { FontePagadora } from 'src/firebaseService'

import { onMounted, ref } from 'vue'

export function useGetFontes() {
  const fontes = ref<FontePagadora[]>([])
  const loading = ref(false)

  const getFontes = async () => {
    loading.value = true
    try {
      const querySnapshot = await getDocs(collection(db, 'fonte-pagadora'))
      console.log(querySnapshot)
      fontes.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<FontePagadora, 'id'>),
      }))
    } catch (error) {
      console.error('Erro ao carregar fontes pagadoras:', error)
      // $q.notify({
      // type: 'negative',
      // message: 'Erro ao carregar fontes pagadoras',
      // })
    } finally {
      loading.value = false
    }
  }

  onMounted(getFontes)

  return { fontes, loading, getFontes }
}
