<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> SisAgron</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Menu Lateral -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Sobre Nós</q-item-label>

        <!-- Links de Navegação -->
        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Início</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/fontes-pagadoras">
          <q-item-section avatar>
            <q-icon name="business" />
          </q-item-section>
          <q-item-section>Fontes Pagadoras</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/NFes">
          <q-item-section avatar>
            <q-icon name="receipt" />
          </q-item-section>
          <q-item-section>Notas Fiscais</q-item-section>
        </q-item>

        <!-- Link para o GitHub -->
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue'

const linksList: EssentialLinkProps[] = [
  {
    title: 'Github',
    caption: 'github.com/Allyson777',
    icon: 'code',
    link: 'https://github.com/Allyson777',
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
    }
  },
})
</script>
