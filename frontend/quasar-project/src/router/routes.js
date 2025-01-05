const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'forum', component: () => import('pages/ForumPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      { path: 'vijesti', component: () => import('pages/VijestiPage.vue') },
      { path: 'vijesti/:id', name: 'VijestiPage', component: () => import('pages/VijestiPage.vue') }
    ]
  },

  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'forum', component: () => import('pages/ForumPage.vue') },
    ],
    meta: { layout: 'user' }
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'forum', component: () => import('pages/ForumPage.vue') },
      { path: 'createnew', component: () => import('pages/CreateNewsPage.vue') },
    ],
    meta: { layout: 'admin' }
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;