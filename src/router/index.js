import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login') },
  { path: '/', redirect: '/login' },
  { path: '/search', component: () => import('@/views/search') },
  { path: '/searchresult/:kw', component: () => import('@/views/search/SearchResult.vue') },
  { path: '/useredit', component: () => import('@/views/user/UserEdit.vue') },
  {
    path: '/layout',
    component: () => import('@/views/layout'),
    redirect: '/layout/home',
    children: [
      { path: 'home', component: () => import('@/views/home') },
      {
        path: 'user',
        component: () => import('@/views/user')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
