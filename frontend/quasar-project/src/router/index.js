import { route } from 'quasar/wrappers';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  
  Router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('uloga');
    const isLoggedIn = !!role;

    if (to.path.startsWith('/user')) {
      if (!isLoggedIn) {
        return next('/login');
      }
      if (role !== 'User') {
        return next('/admin');
      }
    }

    if (to.path.startsWith('/admin')) {
      if (!isLoggedIn) {
        return next('/login');
      }
      if (role !== 'Admin') {
        return next('/user');
      }
    }

    if (to.path === '/') {
      if (role === 'User') {
        return next('/user');
      }
      if (role === 'Admin') {
        return next('/admin');
      }
    }

    
    if (!isLoggedIn && (to.path.startsWith('/user') || to.path.startsWith('/admin'))) {
      return next('/login');
    }

    next();
  });

  return Router;
});
