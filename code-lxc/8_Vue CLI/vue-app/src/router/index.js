import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Tv', component: () => import('../views/Tv.vue') },
  { path: '/music', name: 'Music', component: () => import('../views/Music.vue') },
  { path: '/book', name: 'Book', component: () => import('../views/Book.vue') },
  { path: '/tvDetail/:id', component: () => import('../views/TvDetail.vue') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
