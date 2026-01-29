import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'about',
        component: () => import('pages/AboutPage.vue'),
      },
      {
        path: 'projects',
        component: () => import('pages/ProjectsPage.vue'),
      },
      {
        path: 'education',
        component: () => import('pages/EducationPage.vue'),
      },
      {
        path: 'contact',
        component: () => import('pages/ContactPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
