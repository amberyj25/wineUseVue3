import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
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
  getters: {
    orgProductsClassic: state => state.orgProductsClassic,
    orgProductsNews: state => state.orgProductsNews
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
        .get('https://fluffy-gold-tuxedo.cyclic.app/productListA')
        .then(res => {
          context.commit('getOrgProductsClassic', res.data.data)
        })
    },
    getOrgProductsNews (context) {
      axios
        .get('https://fluffy-gold-tuxedo.cyclic.app/productListB')
        .then(res => {
          context.commit('getOrgProductsNews', res.data.data)
        })
    },
    addCartClassic (context, payload) {
      axios
        .post('https://fluffy-gold-tuxedo.cyclic.app/shoppingCartA', {
          data: payload
        })
        .then(res => {
          this.dispatch('getCurrentShoppingCartClassic')
          context.commit('addCartClassic', res.data)
        })
    },
    addCartNews (context, payload) {
      axios
        .post('https://fluffy-gold-tuxedo.cyclic.app/shoppingCartB', {
          data: payload
        })
        .then(res => {
          this.dispatch('getCurrentShoppingCartNew')
          context.commit('addCartNews', res.data.data)
        })
    },
    getCurrentShoppingCartClassic (context) {
      axios
        .get('https://fluffy-gold-tuxedo.cyclic.app/shoppingCartA')
        .then(res => {
          context.commit('getCurrentShoppingCartClassic', res.data.data)
        })
    },
    getCurrentShoppingCartNew (context) {
      axios
        .get('https://fluffy-gold-tuxedo.cyclic.app/shoppingCartB')
        .then(res => {
          context.commit('getCurrentShoppingCartNew', res.data.data)
        })
    },
    deleteProductsClassic (context, payload) {
      axios
        .delete(`https://fluffy-gold-tuxedo.cyclic.app/shoppingCartA/${payload}`)
        .then(() => this.dispatch('getCurrentShoppingCartClassic'))
    },
    deleteProductsNew (context, payload) {
      axios
        .delete(`https://fluffy-gold-tuxedo.cyclic.app/shoppingCartB/${payload}`)
        .then(() => this.dispatch('getCurrentShoppingCartNew'))
    },
    signOutChange (context) {
      axios.post('https://fluffy-gold-tuxedo.cyclic.app/logout').then(result => {
        context.commit('checkSignIn', false)
      })
    }
  }
})

export const useStore = () => store;

export default store;