import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'*

import authMiddleware from '../middleware/auth'
import guestMiddleware from '../middleware/guest'
/**
 * Dashboard components
 */
import DashboardLayout from '@/layouts/dashboard'
import DashboardIndex from '@/views/dashboard/index'

// import AuthMiddleWare from '@/middleware/auth'

// import AppIndex
import AppIndex from '@/views/dashboard/app/index'
import AppCreate from '@/views/dashboard/app/create'
import AppShow from '@/views/dashboard/app/show'

/**
 * Auth components
 */
import authPage from '@/views/auth/auth'
import LoginForm from '@/components/auth/loginForm'
import signupForm from '@/components/auth/signupForm'
import resetPasswordForm from '@/components/auth/resetPasswordForm'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: {
      auth: true
    },
    children: [
      {
        path: '',
        name: 'dashboard-index',
        component: DashboardIndex
      },
      {
        path: 'apps',
        name: 'dashboard-app-index',
        component: AppIndex
      },
      {
        path: 'apps/create',
        name: 'dashboard-app-create',
        component: AppCreate
      },
      {
        path: 'apps/:id',
        name: 'dashboard-app-show',
        component: AppShow
      }
    ]
  },
  {
    path: '/auth',
    component: authPage,
    meta: {
      guest: true
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginForm
      },
      {
        path: 'signup',
        name: 'signup',
        component: signupForm
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: resetPasswordForm
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// calling the middle wares before exporting the router
authMiddleware(router)
guestMiddleware(router)
export default router
