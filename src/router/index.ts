import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const sectionPaths = ['/', '/about', '/projects', '/education', '/contact'];

  const Router = createRouter({
    scrollBehavior(to) {
      // Para rutas de sección, no interferir con el scroll (lo maneja MainLayout)
      if (sectionPaths.includes(to.path)) {
        return false;
      }
      return { left: 0, top: 0 };
    },
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  return Router;
});
