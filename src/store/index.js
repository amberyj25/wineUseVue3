import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    orgProductsClassic: [],
    orgProductsNews: [],
    checkSignIn: false,
    addCartClassic: [],
    addCartNews: [],
    currentShoppingCartClassic: [],
    currentShoppingCartNew: [],
    searchProductCategory: ''
  },
  mutations: {
    getOrgProductsClassic (state, payload) {
      payload.map(item => {
        item.productNum = 1
        return item
      })

      state.orgProductsClassic = payload
    },
    getOrgProductsNews (state, payload) {
      payload.map(item => {
        item.productNum = 1
        return item
      })

      state.orgProductsNews = payload
    },
    checkSignIn (state, payload) {
      state.checkSignIn = payload
    },
    addCartClassic (state, payload) {
      state.addCartClassic = payload
    },
    addCartNews (state, payload) {
      state.addCartNews = payload
    },
    getCurrentShoppingCartClassic (state, payload) {
      state.currentShoppingCartClassic = payload
    },
    getCurrentShoppingCartNew (state, payload) {
      state.currentShoppingCartNew = payload
    },
    navbarSearchProductCategory (state, payload) {
      state.searchProductCategory = payload
    }
  },
  actions: {
    getOrgProductsClassic (context) {
      axios
        .get('https://vue-course-api.hexschool.io/api/wine5/products')
        .then(res => {
          context.commit('getOrgProductsClassic', res.data.products)
        })
    },
    getOrgProductsNews (context) {
      axios
        .get('https://vue-course-api.hexschool.io/api/wine52/products')
        .then(res => {
          context.commit('getOrgProductsNews', res.data.products)
        })
    },
    addCartClassic (context, payload) {
      axios
        .post('https://vue-course-api.hexschool.io/api/wine5/cart', {
          data: payload
        })
        .then(res => {
          this.dispatch('getCurrentShoppingCartClassic')
          context.commit('addCartClassic', res.data)
        })
    },
    addCartNews (context, payload) {
      axios
        .post('https://vue-course-api.hexschool.io/api/wine52/cart', {
          data: payload
        })
        .then(res => {
          this.dispatch('getCurrentShoppingCartNew')
          context.commit('addCartNews', res.data.data)
        })
    },
    getCurrentShoppingCartClassic (context) {
      axios
        .get('https://vue-course-api.hexschool.io/api/wine5/cart')
        .then(res => {
          context.commit('getCurrentShoppingCartClassic', res.data.data.carts)
        })
    },
    getCurrentShoppingCartNew (context) {
      axios
        .get('https://vue-course-api.hexschool.io/api/wine52/cart')
        .then(res => {
          context.commit('getCurrentShoppingCartNew', res.data.data.carts)
        })
    },
    deleteProductsClassic (context, payload) {
      axios
        .delete(
          `https://vue-course-api.hexschool.io/api/wine5/cart/${payload}`
        )
        .then(() => this.dispatch('getCurrentShoppingCartClassic'))
    },
    deleteProductsNew (context, payload) {
      axios
        .delete(
          `https://vue-course-api.hexschool.io/api/wine52/cart/${payload}`
        )
        .then(() => this.dispatch('getCurrentShoppingCartNew'))
    },
    signOutChange (context) {
      axios.post('https://vue-course-api.hexschool.io/logout').then(result => {
        context.commit('checkSignIn', false)
      })
    }
  }
})
