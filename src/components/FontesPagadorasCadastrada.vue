<template>
  <q-page padding>
    <div class="text-center q-mb-sm">
      <h2 class="text-h4 text-weight-bold">Fontes Pagadoras Cadastradas</h2>
    </div>

    <div class="row q-col-gutter-md">
      <div
        v-for="fonte in fontes"
        :key="fonte.id || fonte.numDocUnico"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Nome:{{ fonte.nome }}</div>
            <div class="text-subtitlte-2">CPF/CNPJ: {{ fonte.numDocUnico }}</div>
          </q-card-section>
          <q-card-section>
            <q-card-actions align="right">
              <q-btn flat icon="edit" @click="editarFonte(fonte)" />
              <q-btn
                v-if="fonte.id"
                flat
                icon="delete"
                color="negative"
                @click="handleRemove(fonte.id)"
              />
              <q-btn
                flat
                icon="search"
                color="primary"
                @click="buscarNotasFiscais(fonte.numDocUnico)"
              >
                <q-tooltip>Buscar Notas Fiscais</q-tooltip>
              </q-btn>
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { updateDoc, doc } from 'firebase/firestore'
import { buscarNFes } from '../nuvemFiscalService'
import type { NotaFiscal } from '../nuvemFiscalService'
import { db } from 'src/firebaseConfig'
import type { FontePagadora } from 'src/firebaseService'
import { useRemoveFonte } from 'src/composables/removeFonte'
import { useGetFontes } from 'src/composables/getFontes'

const { remove } = useRemoveFonte()
const { fontes, getFontes } = useGetFontes()

const notasFiscais = ref<NotaFiscal[]>([])

const buscarNotasFiscais = async (cpfCnpj: string): Promise<void> => {
  try {
    const notas = await buscarNFes(cpfCnpj)
    notasFiscais.value = notas
  } catch (error) {
    console.error('Erro ao buscar notas fiscais:', error)
  }
}

const handleRemove = async (id: string) => {
  await remove(id).then(async () => await getFontes())
}

const editarFonte = async (fonte: FontePagadora): Promise<void> => {
  const novoNome = prompt('Novo nome:', fonte.nome)
  if (novoNome && fonte.id) {
    try {
      await updateDoc(doc(db, 'fonte-pagadora', fonte.id), { nome: novoNome })
      fonte.nome = novoNome
      // $q.notify({ type: 'positive', message: 'Fonte Pagadora atualizada com sucesso!' })
    } catch (error) {
      console.error('Erro ao atualizar fonte pagadora:', error)
      // $q.notify({ type: 'negative', message: 'Erro ao atualizar a Fonte Pagadora!' })
    }
  }
}
</script>
