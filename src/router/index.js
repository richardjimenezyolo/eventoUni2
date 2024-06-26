import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/events/form',
      component: () => import('../views/events/Form.vue')
    },
    {
      path: '/events/:id',
      component: () => import('../views/events/Detail.vue')
    }
  ]
})

export default router
