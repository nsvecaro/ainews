const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, // Glavna stranica
      { path: 'forum', component: () => import('src/pages/IndexForumPage.vue') }, // IndexForumPage
      { path: 'forum/:forumId', name: 'ForumPage', component: () => import('src/pages/ForumPage.vue') }, // ForumPage za specifični forum
      { path: 'forum/:forumId/:postId', name: 'ForumObjava', component: () => import('src/pages/ForumObjavaPage.vue') }, // ForumObjavaPage
      { path: 'forum/create', name: 'CreateForumObjava', component: () => import('src/pages/CreateForumObjavaPage.vue') }, // Kreiranje objava
      { path: 'login', component: () => import('pages/LoginPage.vue') }, // Login stranica
      { path: 'register', component: () => import('pages/RegisterPage.vue') }, // Register stranica
      { path: 'vijesti', component: () => import('pages/VijestiPage.vue') }, // Vijesti IndexPage
      { path: 'vijesti/:id', name: 'VijestiPage', component: () => import('pages/VijestiPage.vue') }, // Vijesti po ID-u
      { path: 'theme', name: 'ThemePage', component: () => import('pages/ThemePage.vue') },
      { path: 'theme/:id', name: 'ThemePage', component: () => import('pages/ThemePage.vue') },
    ],
  },

  {
    path: '/user',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, // Glavna stranica za usera
      { path: 'forum', component: () => import('src/pages/IndexForumPage.vue') }, // IndexForumPage za usera
      { path: 'vijesti', component: () => import('pages/VijestiPage.vue') }, // Vijesti za usera
      { path: 'vijesti/:id', name: 'UserVijestiPage', component: () => import('pages/VijestiPage.vue') }, // Vijesti po ID-u za usera
      { path: 'accountsettings', name: 'userAccountSettings', component: () => import('pages/UserAccountSettingsPage.vue') }, // Postavke korisničkog računa
      { path: 'accountsettings/change-username', component: () => import('pages/ChangeUsername.vue') }, // Promjena username-a
      { path: 'accountsettings/change-password', component: () => import('pages/ChangePassword.vue') }, // Promjena lozinke
      { path: 'accountsettings/my-comments', name: 'myComments', component: () => import('pages/MyCommentsPage.vue') }, // Moji komentari
    ],
  },

  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }, // Glavna stranica za admina
      { path: 'forum', component: () => import('src/pages/IndexForumPage.vue') }, // IndexForumPage za admina
      { path: 'forum/create', name: 'AdminCreateForumObjava', component: () => import('src/pages/CreateForumObjavaPage.vue') }, // Kreiranje objava od strane admina
      { path: 'vijesti', component: () => import('pages/VijestiPage.vue') }, // Vijesti za admina
      { path: 'vijesti/:id', name: 'AdminVijestiPage', component: () => import('pages/VijestiPage.vue') }, // Vijesti po ID-u za admina
      { path: 'createnew', component: () => import('pages/CreateNewsPage.vue') }, // Kreiranje novog sadržaja za admina
      { path: 'accountsettings', name: 'adminAccountSettings', component: () => import('pages/AdminAccountSettingsPage.vue') }, // Postavke korisničkog računa za admina
      { path: 'accountsettings/change-username', component: () => import('pages/ChangeUsername.vue') }, // Promjena username-a za admina
      { path: 'accountsettings/change-password', component: () => import('pages/ChangePassword.vue') }, // Promjena lozinke za admina
      { path: 'accountsettings/my-comments', name: 'adminMyComments', component: () => import('pages/MyCommentsPage.vue') }, // Moji komentari za admina
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'), // Error stranica za 404
  },
];

export default routes;
