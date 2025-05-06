import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import ThankYou from '@/views/ThankYou.vue'
import DatabaseView from '@/views/DatabaseView.vue'
import ProgramView from '@/views/ProgramView.vue'

import { getCookie } from '@/utils/cookie'

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
    },
    {
      path: '/program',
      name: 'program',
      component: ProgramView
    },
    {
      path: '/admin',
      name: 'Admin',
      component: DatabaseView,
      meta: { requiresAdmin: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = getCookie('isAuthenticated') === 'true'

  if (to.meta.requiresAdmin && !isAuthenticated) {
    next({ name: 'main' })
  } else {
    next()
  }
})

export default router
