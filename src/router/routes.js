
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/scanner', component: () => import('pages/Qr.vue') },
      {path:'/account',component: ()=> import('pages/Account.vue')},
      { path: '/detail', component: () => import('pages/LockerDetail.vue') }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/Login.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
