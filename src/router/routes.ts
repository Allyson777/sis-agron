import FontePagadora from 'src/components/FontePagadora.vue'
import NFe from 'src/components/NFe.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, // Rota padrão
      { path: '/fontes-pagadoras', component: FontePagadora }, // Nova rota
      { path: '/NFes', component: NFe },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
