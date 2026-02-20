import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'about', component: () => import('pages/HomePage.vue') },
      { path: 'projects', component: () => import('pages/HomePage.vue') },
      { path: 'education', component: () => import('pages/HomePage.vue') },
      { path: 'contact', component: () => import('pages/HomePage.vue') },
    ],
  },
  {
    path: '/services',
    component: () => import('pages/ServicesPage.vue'),
    meta: {
      title: 'Servicios - James Mendoza | DevMenfroyt',
    },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
