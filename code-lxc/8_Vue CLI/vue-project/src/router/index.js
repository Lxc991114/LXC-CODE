import Vue from 'vue'
import VueRouter from 'vue-router'

import Codepractice from '../views/Codepractice.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Codepractice',
    component: Codepractice,
    children: [
      {
        path: 'fe',
        name: 'Fe',
        component: () => import('../views/Fe.vue')
      },
      {
        path: 'rd',
        name: 'Rd',
        component: () => import('../views/Rd.vue')
      }
    ]
  },
  {
    path: '/userDetail',
    name: 'UserDetail',
    alias: '/end',
    component: () => import('../views/UserDetail.vue')
  },
  {
    path: '/contentDetail',
    name: 'ContentDetail',
    component: () => import('../views/ContentDetail.vue')
  },
  {
    path: '/classDetail/:id/:time',
    name: 'ClassDetail',
    component: () => import('../views/ClassDetail.vue')
  },
  {
    path: '/active',
    name: 'Active',
    redirect: '/',
    component: () => import('../views/Active.vue')
  },
  {
    path: '/overtime/:id/:time',
    name: 'OverTime',
    redirect: '/classDetail/:id/:time',
    component: () => import('../views/OverTime.vue')
  },
  {
    path: '/end',
    name: 'End',
    redirect: '/classDetail/:id/:time',
    component: () => import('../views/End.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/usevuex',
    name: 'UseVuex',
    component: () => import('../views/UseVuex.vue')
  },

  {
    path: '*',
    name: 'Error',
    component: () => import('../views/Error.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
