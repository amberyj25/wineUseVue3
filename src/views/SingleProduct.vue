<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <div
        class="product"
        v-for="(product, index) in renderProduct"
        :key="index"
      >
        <div class="wine">
          <div class="introduction">
            <div class="product_left">
              <p>酒品分類 / {{ category }}</p>
              <img :src="product.image" alt="product" />
            </div>
            <div class="product_right">
              <h5>{{ product.title }}</h5>
              <p>{{ product.category }}</p>
              <div class="year">
                <div class="am">
                  <p class="title">AM</p>
                  <p>85</p>
                </div>
                <div class="ws">
                  <p class="title">WS</p>
                  <p>100</p>
                </div>
              </div>
              <div class="sale_price">
                <div class="sale">＄{{ product.price }}</div>
                <div class="price">＄{{ product.origin_price }}</div>
              </div>
              <div class="cart_num_out">
                <select class="cart_num" v-model="product.productNum">
                  <option :value="num" v-for="(num, index) in 10" :key="index">{{num}}</option>
                </select>
                <button @click="addCart(product.title, product.id, product.productNum)">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { mapState } from 'vuex'

export default {
  name: 'SingleProduct',
  components: {
    Navbar
  },
  data () {
    return {
      product: '',
      category: ''
    }
  },
  computed: {
    ...mapState([
      'orgProductsClassic',
      'orgProductsNews',
      'currentShoppingCartClassic',
      'currentShoppingCartNew'
    ]),
    renderProduct () {
      return this.product
    }
  },
  mounted () {
    this.getRouteParamsId()
  },
  methods: {
    getRouteParamsId () {
      const query = this.$route.query
      const { id, category } = query
      this.category = category
      this.filterProduct(id, category)
    },
    filterProduct (id, category) {
      switch (category) {
        case '新款':
          this.product = this.orgProductsNews.filter(item => item.id === id)
          break
        case '經典款':
          this.product = this.orgProductsClassic.filter(item => item.id === id)
          break
      }
    },
    addCart (title, id, qty) {
      const titleSplit = title.split('')
      const params = {
        product_id: id,
        qty: qty
      }
      this.checkItemIsDoubleOrNot(titleSplit, id, params, qty)
    },
    checkItemIsDoubleOrNot (titleSplit, id, params, qty) {
      const checkClassicItemIsDoubleOrNotArray = this.currentShoppingCartClassic.filter(item => item.product.id === id)
      const checkNewItemIsDoubleOrNotArray = this.currentShoppingCartNew.filter(item => item.product.id === id)

      if (checkClassicItemIsDoubleOrNotArray.length !== 0 || checkNewItemIsDoubleOrNotArray.length !== 0) {
        this.checkDoubleItemCategory(titleSplit, checkClassicItemIsDoubleOrNotArray, checkNewItemIsDoubleOrNotArray, params, qty)
        return
      }

      switch (titleSplit[0]) {
        case 'A':
          this.$store.dispatch('addCartClassic', params)
          break
        case 'B':
          this.$store.dispatch('addCartClassic', params)
          break
        case 'V':
          this.$store.dispatch('addCartNews', params)
          break
      }
    },
    checkDoubleItemCategory (titleSplit, checkClassicItemIsDoubleOrNotArray, checkNewItemIsDoubleOrNotArray, params, qty) {
      switch (titleSplit[0]) {
        case 'A':
          this.updateClassicDoubleItemQty(checkClassicItemIsDoubleOrNotArray, params, qty)
          break
        case 'B':
          this.updateClassicDoubleItemQty(checkClassicItemIsDoubleOrNotArray, params, qty)
          break
        case 'V':
          this.updateNewDoubleItemQty(checkNewItemIsDoubleOrNotArray, params, qty)
          break
      }
    },
    updateClassicDoubleItemQty (checkClassicItemIsDoubleOrNotArray, params, qty) {
      const classicDoubleItemId = checkClassicItemIsDoubleOrNotArray[0].id
      const classicDoubleItemqty = checkClassicItemIsDoubleOrNotArray[0].qty

      params.qty = qty + classicDoubleItemqty

      this.$store.dispatch('deleteProductsClassic', classicDoubleItemId)
      this.$store.dispatch('addCartClassic', params)
    },
    updateNewDoubleItemQty (checkNewItemIsDoubleOrNotArray, params, qty) {
      const newDoubleItemId = checkNewItemIsDoubleOrNotArray[0].id
      const newDoubleItemQty = checkNewItemIsDoubleOrNotArray[0].qty

      params.qty = qty + newDoubleItemQty

      this.$store.dispatch('deleteProductsNew', newDoubleItemId)
      this.$store.dispatch('addCartNews', params)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1400px !important;
  padding: 50px;
      .product{
        margin-top: 80px;
        .wine{
          .introduction {
            display: flex;
            .product_left {
              p {
                padding: 0 100px;
                margin-bottom: 50px;
                text-align: left;
                font-size: 1.5rem;
              }
              width: 50%;
              text-align: center;
              img {
                max-width: 100%;
                height: 450px;
                object-fit: cover;
              }
            }
            .product_right {
              width: 60%;
              h5 {
                font-size: 4rem;
                margin: 0;
              }
              p {
                font-size: 1.5rem;
                margin: 25px 0 50px;
              }
              .year {
                display: flex;
                margin-top: 30px;
                div + div {
                  margin-left: 15px;
                }
                div {
                  width: 80px;
                  border: 2px solid #5e3a1a;
                  .title {
                    background-color: #5e3a1a;
                    color: white;
                  }
                  p {
                    text-align: center;
                    color: gray;
                    margin: 0;
                  }
                }
              }
              .sale_price {
                margin: 50px 0 50px;
                .sale {
                  font-size: 3rem;
                  color: red;
                }
                .price {
                  font-size: 1.5rem;
                  padding: 10px 70px;
                  text-decoration: line-through;
                }
              }
              .cart_num_out {
                width: 80%;
                display: flex;
                justify-content: space-between;
                .cart_num {
                  width: 50%;
                  height: 45px;
                  border: 2px solid#c1ad9e;
                }
                button {
                  border-radius: 35px;
                  border: 1px solid #7f5c5c;
                  padding: 5px 20px;
                  background: #7f5c5c;
                  color: white;
                }
              }
            }
          }
        }
      }
}
</style>
