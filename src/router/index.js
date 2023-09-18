// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/dashboard',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
      },
    ],
  },
 
  {
    path: '/accounts',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Accounts',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Accounts.vue'),
      },
    ],
  }, 
  {
    path: '/config',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Config',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Config.vue'),
      },
    ],
  }, 
  {
    path: '/scan-qrcode',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Scan-qrcode',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Scan-qrcode.vue'),
      },
    ],
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
