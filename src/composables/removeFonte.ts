import { deleteDoc, doc } from 'firebase/firestore'
import { useQuasar } from 'quasar'
import { db } from 'src/firebaseConfig'

export function useRemoveFonte() {
  const $q = useQuasar()
  const remove = async (id: string) => {
    try {
      const docRef = doc(db, 'fonte-pagadora', id)
      await deleteDoc(docRef)

      $q.notify({ type: 'positive', message: 'Fonte Pagadora removida com sucesso!' })
    } catch (error) {
      console.error('Erro ao remover fonte pagadora:', error)
    }
  }
  return { remove }
}
