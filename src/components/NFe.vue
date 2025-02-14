<template>
  <div>
    <div class="q-pa-md">
      <q-input v-model="cpfCnpj" label="CPF/CNPJ" outlined dense />
      <q-btn color="primary" label="Buscar Notas" class="q-mt-sm" @click="carregarNotas" />
    </div>

    <q-list bordered separator class="q-mt-md">
      <q-item v-for="nota in notasFiscais" :key="nota.chaveAcesso">
        <q-item-section>
          <q-item-label>{{ nota.emisor }}</q-item-label>
          <q-item-label caption>Destinatário: {{ nota.destinatarioRemetente }}</q-item-label>
          <q-item-label caption>NFe Nº: {{ nota.noNfe }}</q-item-label>
          <q-item-label caption>Valor: R$ {{ nota.valorTotal.toFixed(2) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { buscarNFes } from '../nuvemFiscalService'
import type { NotaFiscal } from '../nuvemFiscalService'

const cpfCnpj = ref('')
const notasFiscais = ref<NotaFiscal[]>([])

async function carregarNotas() {
  if (!cpfCnpj.value) {
    console.warn('Informe um CPF/CNPJ válido')
    return
  }

  try {
    const resultado = await buscarNFes(cpfCnpj.value)
    notasFiscais.value = resultado
  } catch (error) {
    console.error('Erro ao carregar notas fiscais:', error)
  }
}
</script>

<style scoped>
.q-card {
  max-width: 500px;
  margin: auto;
}
</style>
