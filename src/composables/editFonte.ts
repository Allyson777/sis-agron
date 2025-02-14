import { doc, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebaseConfig'
import type { FontePagadora } from 'src/firebaseService'
import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'

interface UseEditFonteOptions {
  fonte: Ref<FontePagadora | undefined>
}

export function editFonte({ fonte: fonteRef }: UseEditFonteOptions) {
  const fonte = ref<FontePagadora>()

  const editFonte = async () => {
    if (!fonte.value) return
    try {
      await updateDoc(doc(db, 'fonte-pagadora', fonte.value.id!), { ...fonte.value })
    } catch (erro) {
      console.log('erro', erro)
    }
  }
  watchEffect(() => {
    if (!fonteRef.value) {
      return
    }
    fonte.value = fonteRef.value
  })
  return { editFonte }
}
