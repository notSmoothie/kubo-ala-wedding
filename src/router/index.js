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
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const element = document.querySelector(to.hash)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        return
      }
    }
    return savedPosition || { top: 0 }
  }
})

export default router
