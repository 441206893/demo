import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Product from '../views/Product';
Vue.use(VueRouter)
const routes = [{
  path: '/',
  name: 'Layout',
  component: Layout,
  children: [{
      path: '/',
      name: 'Product',
      component: Product,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/params',
      name: 'Params',
      component: () => import('../views/Params'),
      meta: {
        isLogin: true
      }
    },
    {
      path: '/center',
      name: 'Center',
      component: () => import('../views/Center'),
      meta: {
        isLogin: true
      }
    },
    {
      path: '/advert',
      name: 'Advert',
      component: () => import('../views/Advert'),
      meta: {
        isLogin: true
      }
    }
  ]
}, {
  path: '/login',
  name: 'Login',
  component: () => import('../views/Login.vue')
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router