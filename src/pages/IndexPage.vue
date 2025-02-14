<template>
  <q-page class="row items-center justify-evenly">
    <!--titulo-->
    <div class="full-width text-center">
      <h1 class="text-h4 text-weight-bold text-primary">Bem-vindo ao SisAgron</h1>
    </div>

    <!--Card-->
    <q-card class="card-options q-pa-sm">
      <q-card-section class="text-center">
        <p class="text-h6">O que você deseja fazer?</p>
      </q-card-section>
      <q-card-actions class="q-gutter-md justify-center">
        <q-btn
          color="primary"
          label="Ver notas fiscais"
          @click="$router.push('/NFes')"
          icon="receipt"
          padding="12px 24px"
        />
        <q-btn
          color="secondary"
          label="Gerenciar Fontes Pagadoras"
          @click="$router.push('/fontes-pagadoras')"
          icon="business"
          padding="12px 24px"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'IndexPage',
})
</script>

<style scoped>
.card-options {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.text-primary {
  color: #1976d2;
}
.q-gutter-md {
  margin-top: 12px;
}

q-btn {
  font-size: 16px;
  font-weight: 500;
}
</style>
