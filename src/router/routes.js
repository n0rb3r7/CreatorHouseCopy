const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'help', component: () => import('pages/Help.vue') },
      { path: 'home', component: () => import('pages/Home.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
      { path: 'createpost/:idCreator', component: () => import('pages/CreatePost.vue') },
      { path: 'edituser', component: () => import('pages/EditUser.vue') },
      { path: 'registercreator', component: () => import('pages/RegisterCreator.vue') },
      { path: 'creator/:idCreator', component: () => import('pages/Creator.vue') },
      { path: 'creator/:idCreator/post/:idPost', component: () => import('pages/CreatorPost.vue') },
      { path: 'filterCategory/:idCategory', component: () => import('pages/FilterCategory.vue') },
      { path: 'banner', component: () => import('pages/Banner.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
