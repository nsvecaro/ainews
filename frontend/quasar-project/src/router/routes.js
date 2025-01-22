const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, 
      { path: 'forum', component: () => import('src/pages/IndexForumPage.vue') }, 
      { path: 'forum/:forumId', name: 'ForumPage', component: () => import('src/pages/ForumPage.vue') }, 
      { path: 'forum/:forumId/:postId', name: 'ForumObjava', component: () => import('src/pages/ForumObjavaPage.vue') }, 
      { path: 'forum/create', name: 'CreateForumObjava', component: () => import('src/pages/CreateForumObjavaPage.vue') }, 
      { path: 'login', component: () => import('pages/LoginPage.vue') }, 
      { path: 'register', component: () => import('pages/RegisterPage.vue') }, 
      { path: 'vijesti', component: () => import('pages/VijestiPage.vue') }, 
      { path: 'vijesti/:id', name: 'VijestiPage', component: () => import('pages/VijestiPage.vue') }, 
      { path: 'theme', name: 'ThemePage', component: () => import('pages/ThemePage.vue') },
      { path: 'theme/:id', name: 'ThemePage', component: () => import('pages/ThemePage.vue') },
    ],
  },

  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, 
      { path: 'forum', component: () => import('src/pages/IndexForumPage.vue') }, 
      { path: 'forum/:forumId', name: 'ForumPage', component: () => import('src/pages/ForumPage.vue') }, 
      { path: 'forum/:forumId/:postId', name: 'ForumObjava', component: () => import('src/pages/ForumObjavaPage.vue') }, 
      { path: 'forum/:forumId/create', name: 'CreateForumObjava', component: () => import('src/pages/CreateForumObjavaPage.vue') }, 
      { path: 'vijesti', component: () => import('pages/VijestiPage.vue') }, 
      { path: 'vijesti/:id', name: 'UserVijestiPage', component: () => import('pages/VijestiPage.vue') }, 
      { path: 'accountsettings', name: 'userAccountSettings', component: () => import('pages/UserAccountSettingsPage.vue') }, 
      { path: 'accountsettings/change-username', component: () => import('pages/ChangeUsername.vue') }, 
      { path: 'accountsettings/change-password', component: () => import('pages/ChangePassword.vue') }, 
      { path: 'accountsettings/my-comments', name: 'myComments', component: () => import('pages/MyCommentsPage.vue') },
    ],
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, 
      { path: 'forum', component: () => import('src/pages/IndexForumPage.vue') }, 
      { path: 'forum/create', name: 'AdminCreateForumObjava', component: () => import('src/pages/CreateForumObjavaPage.vue') }, 
      { path: 'vijesti', component: () => import('pages/VijestiPage.vue') }, 
      { path: 'vijesti/:id', name: 'AdminVijestiPage', component: () => import('pages/VijestiPage.vue') }, 
      { path: 'createnew', component: () => import('pages/CreateNewsPage.vue') }, 
      { path: 'accountsettings', name: 'adminAccountSettings', component: () => import('pages/AdminAccountSettingsPage.vue') }, 
      { path: 'accountsettings/change-username', component: () => import('pages/ChangeUsername.vue') }, 
      { path: 'accountsettings/change-password', component: () => import('pages/ChangePassword.vue') }, 
      { path: 'accountsettings/my-comments', name: 'adminMyComments', component: () => import('pages/MyCommentsPage.vue') }, 
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'), // Error stranica za 404
  },
];

export default routes;
