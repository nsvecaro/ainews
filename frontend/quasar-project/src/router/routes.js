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
      { path: 'accountsettings', name: 'userAccountSettings',  component: () => import('pages/UserAccountSettingsPage.vue') },
      {  path: 'accountsettings/change-username', component: () => import('pages/ChangeUsername.vue')  },
      {  path: 'accountsettings/change-password',  component: () => import('pages/ChangePassword.vue')  }
    ]
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'forum', component: () => import('pages/ForumPage.vue') },
      { path: 'createnew', component: () => import('pages/CreateNewsPage.vue') },
      { path: 'accountsettings',  name: 'adminAccountSettings',  component: () => import('pages/AdminAccountSettingsPage.vue') },
      { path: 'accountsettings/change-username', component: () => import('pages/ChangeUsername.vue') },
      { path: 'accountsettings/change-password',  component: () => import('pages/ChangePassword.vue') }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
