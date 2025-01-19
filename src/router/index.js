import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import ThankYou from '@/views/ThankYou.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: HomeView
    },
    {
      path: '/rsvp',
      name: 'rsvp',
      component: AboutView
    },
    {
      path: '/thank-you',
      name: 'ThankYou',
      component: ThankYou
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
