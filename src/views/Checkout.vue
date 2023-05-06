<template>
  <div>
    <div class="nav_bar_root">
      <Navbar></Navbar>
    </div>
    <div class="container">
      <h1>結帳</h1>
      <div class="checkout_sop">
        <div
          v-for="(item, index) in checkoutSop"
          :key="index"
          class="checkout_sop_item"
          :class="{ 'checkout_sop_item': true, bgColor: changeTab === item.component }"
        >
          <h2> {{item.title}} </h2>
        </div>
      </div>
      <div class="checkout_sop_content">
        <component
          :is="changeTab"
          :classicProductData="classicProductData"
          :newProductData="newProductData"
          @changeComponent="changeComponent"
        ></component>
      </div>

    </div>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import CheckoutShoppingCartContent from '@/components/CheckoutShoppingCartContent.vue'
import CheckoutCustomerForm from '@/components/CheckoutCustomerForm.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Checkout',
  components: {
    Navbar,
    CheckoutShoppingCartContent,
    CheckoutCustomerForm
  },
  data () {
    return {
      componentTab: 'CheckoutShoppingCartContent',
      checkoutSopItem: [
        {
          title: '1.確認購物車內容',
          component: 'CheckoutShoppingCartContent'
        },
        {
          title: '2.輸入收件人資料',
          component: 'CheckoutCustomerForm'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'currentShoppingCartClassic',
      'currentShoppingCartNew'
    ]),
    classicProductData () {
      return this.currentShoppingCartClassic
    },
    newProductData () {
      return this.currentShoppingCartNew
    },
    changeTab () {
      return this.componentTab
    },
    checkoutSop () {
      return this.checkoutSopItem
    }
  },
  watch: {
    componentTab () {
      this.getCurrentShoppingCartClassic()
      this.getCurrentShoppingCartNew()
    }
  },
  mounted () {
    this.getCurrentShoppingCartClassic()
    this.getCurrentShoppingCartNew()
  },
  methods: {
    ...mapActions([
      'getCurrentShoppingCartClassic',
      'getCurrentShoppingCartNew'
    ]),
    changeComponent (component) {
      this.componentTab = component
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin-bottom: 0;
}
.nav_bar_root {
  height: 48px;
}
.container {
  max-width: 1140px;
  padding: 0 48px;
  h1 {
    color: #7c757d;
    font-size: 1.5rem;
    text-align: center;
    margin: 25px 0;
  }
  .checkout_sop {
    display: flex;
    justify-content: center;
    margin: 25px 0;
    div+div {
      margin-left: 35px;
    }
    .checkout_sop_item {
      padding: 15px 100px;
      h2{
        font-size: 1rem;
        font-weight: 400;
        text-align: center;
      }
    }
    .bgColor {
      background-color:#00FFFF;
      border-radius: 5px;
    }
  }
}
@media (max-width: 1100px) {
  .checkout_sop_item {
    padding: 15px 25px;
  }
}
@media (max-width: 700px) {
  .checkout_sop_item {
    padding: 15px 10px;
  }
}
</style>
