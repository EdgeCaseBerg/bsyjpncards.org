import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import 何 from '../views/何.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/何',
    name: '何',
    component: 何
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
