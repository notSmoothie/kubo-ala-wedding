import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import WorkingView from '@/views/WorkingView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WorkingView
    },
    {
      path: '/test',
      name: 'test',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
