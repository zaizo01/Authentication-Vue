import { createRouter, createWebHistory  } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {rutaProtegida: true}
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import('../views/Edit.vue'),
    meta: {rutaProtegida: true}
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/ingreso',
    name: 'Ingreso',
    component: () => import('../views/Ingreso.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.rutaProtegida) {
    if (store.getters.userAuth) {
      next()
    } else {
      next('/ingreso')
    }
  } else {
    next()
  }
})

export default router
