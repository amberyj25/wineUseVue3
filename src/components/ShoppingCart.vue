<template>
  <div class="shopping_cart_root">
    <b-dropdown
      id="dropdown-right"
      right
      text="Right align"
      size="lg"
      variant="link"
      toggle-class="text-decoration-none"
      no-caret
    >
      <template v-slot:button-content>
        <i class="fas fa-shopping-cart"></i>
        <b-badge variant="primary">{{ shoppingItemsLength }}</b-badge>
      </template>
      <p class="title">已選購 經典款 商品</p>
      <b-dropdown-item
        href="#"
        v-for="(classicProduct, index) in getClassicProducts"
        :key="`classicProduct${index}`"
        class="content"
      >
        <div class="item">
          <span>{{ classicProduct.product.title }}</span>
          <span>{{ classicProduct.qty }}瓶</span>
          <span>${{ classicProduct.qty*classicProduct.product.price }}</span>
          <span @click.prevent="deleteClassicProduct(classicProduct.id)" class="deleteIcon">
            <i class="far fa-trash-alt"></i>
          </span>
        </div>
        <hr />
      </b-dropdown-item>
      <p class="title">已選購 新款 商品</p>
      <b-dropdown-item
        href="#"
        v-for="(newProduct, index) in getNewProducts"
        :key="`newProduct${index}`"
        class="content"
      >
        <div class="item">
          <span>{{ newProduct.product.title }}</span>
          <span>{{ newProduct.qty }}瓶</span>
          <span>${{ newProduct.qty*newProduct.product.price }}</span>
          <span @click.prevent="deleteNewProduct(newProduct.id)" class="deleteIcon">
            <i class="far fa-trash-alt"></i>
          </span>
        </div>
        <hr />
      </b-dropdown-item>
      <div class="checkout">
        <div class="btn" @click="changePageToCheckout">結帳</div>
      </div>
    </b-dropdown>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ShoppingCart',
  data () {
    return {
      classicProductData: [],
      newProductData: [],
      totalDataLength: ''
    }
  },
  computed: {
    ...mapState([
      'currentShoppingCartClassic',
      'currentShoppingCartNew'
    ]),
    getClassicProducts () {
      return this.currentShoppingCartClassic
    },
    getNewProducts () {
      return this.currentShoppingCartNew
    },
    shoppingItemsLength () {
      return this.totalDataLength
    }
  },
  watch: {
    currentShoppingCartClassic () {
      this.getShoppingCartClassic()
      this.getTotalNumData()
    },
    currentShoppingCartNew () {
      this.getShoppingCartNew()
      this.getTotalNumData()
    }
  },
  mounted () {
    this.getShoppingCartClassic()
    this.getShoppingCartNew()
    this.getTotalNumData()
  },
  methods: {
    ...mapActions([
      'getCurrentShoppingCartClassic',
      'getCurrentShoppingCartNew'
    ]),
    getTotalNumData () {
      this.totalDataLength = this.classicProductData.length + this.newProductData.length
    },
    getShoppingCartClassic () {
      this.classicProductData = this.currentShoppingCartClassic
    },
    getShoppingCartNew () {
      this.newProductData = this.currentShoppingCartNew
    },
    deleteClassicProduct (id) {
      this.$store.dispatch('deleteProductsClassic', id)
    },
    deleteNewProduct (id) {
      this.$store.dispatch('deleteProductsNew', id)
    },
    changePageToCheckout () {
      this.$router.push('/checkout')
    }
  }
}
</script>

<style lang="scss" scoped>
.shopping_cart_root {
  .fa-shopping-cart {
    font-size: 25px;
    color: white;
  }
  .title {
    text-align: center;
    font-size: 1.3rem;
    color: #8c6e55;
  }
  .content {
    width: 250px;
    .item {
      display: flex;
      justify-content: space-between;
      .deleteIcon {
        display: inline-block;
        width: 25px;
        height: 25px;
        text-align: center;
      }
    }
    hr {
      border: 1px solid black;
    }
  }
  .checkout {
    text-align: center;
    margin-bottom: 10px;
    .btn {
      display: inline-block;
      padding: 5px 25px;
      border: 1px solid#00aedd;
      color: #fe5050;
      text-decoration: none;
      &:hover {
        background-color: #fe5050;
        color: white;
      }
    }
  }
}
</style>
