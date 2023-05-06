import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import Login from '@/views/Login.vue'
import ProductsPage from '@/views/ProductsPage.vue'
import Checkout from '@/views/Checkout.vue'
import SingleProduct from '@/views/SingleProduct.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    }, {
      path: '/productsPage',
      name: 'ProductsPage',
      component: ProductsPage
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    }, {
      path: '/singleProduct/:id',
      name: 'SingleProduct',
      component: SingleProduct
    }
  ]
})
