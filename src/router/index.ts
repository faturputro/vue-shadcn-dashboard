import { createRouter, createWebHistory, type RouteMeta } from 'vue-router'
import DashboardLayoutVue from '@/components/DashboardLayout.vue';

interface IRouteMeta {
  title: string
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: 'Login',
      } as RouteMeta & IRouteMeta,
    },
    {
      path: '/dashboard',
      component: DashboardLayoutVue,
      redirect: '/dashboard/home',
      meta: {
        title: 'Dashboard',
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/dashboard/Home.vue'),
          meta: {
            title: 'Home',
          } as RouteMeta & IRouteMeta
        },
      ],
    },
  ]
});

router.beforeEach((loc) => {
  document.title = loc.meta.title as string;
})

export default router
