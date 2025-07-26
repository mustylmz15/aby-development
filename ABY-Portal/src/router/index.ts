import { createRouter, createWebHistory } from 'vue-router'
import AnaGiris from '@/views/AnaGiris.vue'

const routes = [
  {
    path: '/',
    name: 'AnaGiris',
    component: AnaGiris
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
