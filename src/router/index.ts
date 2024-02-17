import { createRouter, createWebHistory, type RouteMeta } from 'vue-router'
import DashboardLayoutVue from '@/layouts/dashboard.vue';

interface IRouteMeta {
  title: string
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard/home',
    },
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
          component: () => import('@/views/dashboard/examples/Home.vue'),
          meta: {
            title: 'Home',
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'task',
          name: 'tasks_index',
          component: () => import('@/views/dashboard/examples/tasks/Index.vue'),
          meta: {
            title: 'Tasks',
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'user',
          name: 'user_index',
          component: () => import('@/views/dashboard/examples/user/Index.vue'),
          meta: {
            title: 'User',
          } as RouteMeta & IRouteMeta
        },
        {
          path: 'settings',
          name: 'settings_index',
          component: () => import('@/views/dashboard/examples/settings/Index.vue'),
          meta: {
            title: 'Settings',
          } as RouteMeta & IRouteMeta
        },
      ],
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('@/views/404.vue'),
      meta: {
        title: 'Page Not Found',
      } as RouteMeta & IRouteMeta,
    },
  ]
});

router.beforeEach((loc) => {
  document.title = loc.meta.title as string;
})

export default router
