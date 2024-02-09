import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayoutVue from '@/components/DashboardLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/dashboard',
      component: DashboardLayoutVue,
      redirect: '/dashboard/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/dashboard/Home.vue'),
        },
      ],
    },
  ]
})

export default router
