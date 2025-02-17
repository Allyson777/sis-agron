<template>
  <q-page padding>
    <h2 color="primary">Bem-vindo ao SisAgron</h2>

    <q-card>
      <q-card-section>
        <q-input
          v-model="novaFonte.nome"
          label="Nome da fonte-pagadora"
          outlined
          :rules="[(val) => !!val || 'O nome da fonte-pagadora é obrigatório']"
        />
        <q-input
          v-model="novaFonte.numDocUnico"
          type="text"
          label="CPF/CNPJ"
          outlined
          :rules="[(val) => !!val || 'O CPF/CNPJ é obrigatório']"
        />
        <q-card-section
          v-if="novaFonte.contas && novaFonte.contas.length > 0 && novaFonte.contas[0]"
        >
          <q-input
            v-model="novaFonte.contas[0].agencia"
            type="number"
            label="Agência"
            outlined
          /><q-input
            v-model="novaFonte.contas[0].nomeBanco"
            type="text"
            label="Nome do banco"
            outlined
          /><q-input
            v-model="novaFonte.contas[0].numBanco"
            type="number"
            label="Numero do banco"
            outlined
          />
          <q-input
            v-model="novaFonte.contas[0].numConta"
            type="number"
            label="Numero da conta"
            outlined
          />
        </q-card-section>
      </q-card-section>
      <q-card-actions>
        <q-btn
          :loading="loading"
          label="Adicionar"
          color="primary"
          @click="adicionarFontePagadora"
        />
        <q-btn
          :loading="loading"
          label="Ver Fontes-Pagadoras"
          color="negative"
          @click="$router.push('/fontesPagadoras-cadastradas')"
        />
      </q-card-actions>
    </q-card>

    <!-- Lista de NFes -->
    <div v-if="notasFiscais.length > 0">
      <h2>Notas Fiscais Encontradas</h2>
      <q-list bordered separator>
        <q-item v-for="nota in notasFiscais" :key="nota.chaveAcesso" || nota.nNFe>
          <q-item-section>
            <q-item-label>{{ nota.emisor }}</q-item-label>
            <q-item-label caption>
              NF-e: {{ nota.noNfe }} - R$ {{ nota.valorTotal.toFixed(2) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { NotaFiscal } from '../nuvemFiscalService'

import { useAddFonte } from 'src/composables/addFonte'
import type { FontePagadora } from 'src/firebaseService'

import { useGetFontes } from 'src/composables/getFontes'

const { getFontes } = useGetFontes()

const loading = ref(false)

const notasFiscais = ref<NotaFiscal[]>([])

const novaFonte = ref<FontePagadora>({
  nome: '',
  numDocUnico: '',
  contas: [
    {
      agencia: 0,
      nomeBanco: '',
      numBanco: 0,
      numConta: 0,
    },
  ],
})

const { newFonte } = useAddFonte({
  fonte: novaFonte,
})

const adicionarFontePagadora = async (): Promise<void> => {
  await newFonte().then(async () => await getFontes())
}
</script>
