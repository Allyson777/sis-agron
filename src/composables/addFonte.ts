import { addDoc, collection } from 'firebase/firestore'
import { db } from 'src/firebaseConfig'
import type { FontePagadora } from 'src/firebaseService'
import { ref, watchEffect, type Ref } from 'vue'

interface UseAddFonteOptions {
  fonte: Ref<FontePagadora | undefined>
}
export function useAddFonte({ fonte: fonteRef }: UseAddFonteOptions) {
  const fonte = ref<FontePagadora>()

  const newFonte = async () => {
    try {
      await addDoc(collection(db, 'fonte-pagadora'), { ...fonte.value })
    } catch (erro) {
      console.log('erro ', erro)
    }
  }

  watchEffect(() => {
    if (!fonteRef.value) {
      return
    }
    fonte.value = fonteRef.value
  })
  return { newFonte }
}
