import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login') },
  { path: '/', redirect: '/login' },
  { path: '/home', component: () => import('@/views/home') }
]

const router = new VueRouter({
  routes
})

export default router
