<template>
  <div>
    <div
        class="products"
        v-for="(category, index) in categoryProducts"
        :key="index"
      >
      <b-row class="top">
        <b-col
          cols="9"
          sm="11"
        >
          <h2>{{ category.title }}</h2>
        </b-col>
        <b-col cols="1" class="page justify-content-center mb-3">
          <div>
            <i class="fas fa-angle-left" @click="getPreviousPage(category.title)"></i>
          </div>
          <div>
            <i class="fas fa-angle-right" @click="getNextPage(category.title)"></i>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          class="product"
          cols="12 mb-5"
          md="6"
          lg="3"
          v-for="(product, index) in category.data"
          :key="index"
        >
          <div class="wine">
            <div class="introduction">
              <div class="product_left">
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
              </div>
              <div class="product_right">
                <img :src="product.image" alt="product" />
              </div>
              <div class="product_top_detail">
                <div class="product_top_detail_inner">
                  <p>經典</p>
                </div>
              </div>
            </div>
            <div class="product_bottom">
              <div class="cart_num_out">
                <select class="cart_num" v-model="product.productNum">
                  <option :value="num" v-for="(num, index) in 10" :key="index">{{num}}</option>
                </select>
                <button @click="addCart(product.title, product.id, product.productNum)">Add to cart</button>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Products',
  data () {
    return {
      currentClassicPage: 1,
      currentNewPage: 1,
      classicData: {},
      newData: {},
      classicAndNewData: []
    }
  },
  computed: {
    ...mapState([
      'orgProductsClassic',
      'orgProductsNews',
      'currentShoppingCartClassic',
      'currentShoppingCartNew'
    ]),
    categoryProducts () {
      return this.getCategoryProducts()
    }
  },
  watch: {
    orgProductsClassic () {
      // eslint-disable-next-line dot-notation
      this.classicData['title'] = '經典款'
      // eslint-disable-next-line dot-notation
      this.classicData['data'] = this.orgProductsClassic.filter(item => item.num < 5)
      this.classicAndNewData.push(this.classicData)
    },
    orgProductsNews () {
      // eslint-disable-next-line dot-notation
      this.newData['title'] = '新款'
      // eslint-disable-next-line dot-notation
      this.newData['data'] = this.orgProductsNews.filter(item => item.num < 5)
      this.classicAndNewData.push(this.newData)
      this.$emit('getLoadingData', false)
    },
    currentClassicPage () {
      this.classicAndNewData = []
      switch (this.currentClassicPage) {
        case 1:
          // eslint-disable-next-line dot-notation
          this.classicData['data'] = this.orgProductsClassic.filter(item => item.num < 5)
          break
        case 2:
          // eslint-disable-next-line dot-notation
          this.classicData['data'] = this.orgProductsClassic.filter(item => item.num > 4 && item.num < 9)
          break
      }
      this.classicAndNewData.push(this.classicData)
      this.classicAndNewData.push(this.newData)
    },
    currentNewPage () {
      this.classicAndNewData = []
      switch (this.currentNewPage) {
        case 1:
          // eslint-disable-next-line dot-notation
          this.newData['data'] = this.orgProductsNews.filter(item => item.num < 5)
          break
        case 2:
          // eslint-disable-next-line dot-notation
          this.newData['data'] = this.orgProductsNews.filter(item => item.num > 4 && item.num < 9)
          break
      }
      this.classicAndNewData.push(this.classicData)
      this.classicAndNewData.push(this.newData)
    }
  },
  mounted () {
    this.getOrgProductsClassic()
    this.getOrgProductsNews()
    this.getCurrentShoppingCartClassic()
    this.getCurrentShoppingCartNew()
  },
  methods: {
    ...mapActions(['getOrgProductsClassic', 'getOrgProductsNews', 'getCurrentShoppingCartClassic', 'getCurrentShoppingCartNew']),
    getPreviousPage (category) {
      switch (category) {
        case '經典款':
          if (this.currentClassicPage === 1) return

          this.currentClassicPage -= 1
          break
        case '新款':
          if (this.currentNewPage === 1) return

          this.currentNewPage -= 1
          break
      }
    },
    getNextPage (category) {
      switch (category) {
        case '經典款':
          if (this.currentClassicPage === 2) return

          this.currentClassicPage += 1
          break
        case '新款':
          if (this.currentNewPage === 2) return

          this.currentNewPage += 1
          break
      }
    },
    addCart (title, id, qty) {
      const titleSplit = title.split('')
      const params = {
        product_id: id,
        qty: qty
      }
      // 判斷 新增加的product是否與當前 shoppingCart 內的 item 有相同
      this.checkItemIsDoubleOrNot(titleSplit, params, qty, id)
    },
    getCategoryProducts () {
      return this.classicAndNewData
    },
    checkItemIsDoubleOrNot (titleSplit, params, qty, id) {
      const checkClassicItemIsDoubleOrNotArray = this.currentShoppingCartClassic.filter(item => item.product.id === id)
      const checkNewItemIsDoubleOrNotArray = this.currentShoppingCartNew.filter(item => item.product.id === id)
      if (checkClassicItemIsDoubleOrNotArray.length !== 0 || checkNewItemIsDoubleOrNotArray.length !== 0) {
        this.checkDoubleItemCategory(titleSplit, checkClassicItemIsDoubleOrNotArray, checkNewItemIsDoubleOrNotArray, params, qty)
        return
      }
      // 經過 上面 判斷新增加的product是否有與當前 shoppingCart 的 item有相同, 沒有才會繼續從這邊往下跑
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
    checkDoubleItemCategory (titleSplit, checkClassicItemIsDoubleOrNot, checkNewItemIsDoubleOrNot, params, qty) {
      switch (titleSplit[0]) {
        case 'A':
          this.updateClassicDoubleItemQty(checkClassicItemIsDoubleOrNot, params, qty)
          break
        case 'B':
          this.updateClassicDoubleItemQty(checkClassicItemIsDoubleOrNot, params, qty)
          break
        case 'V':
          this.updateNewDoubleItemQty(checkNewItemIsDoubleOrNot, params, qty)
          break
      }
    },
    updateClassicDoubleItemQty (checkClassicItemIsDoubleOrNot, params, qty) {
      const classicDoubleItemId = checkClassicItemIsDoubleOrNot[0].id
      const classicDoubleItemOrgQty = checkClassicItemIsDoubleOrNot[0].qty

      params.qty = classicDoubleItemOrgQty + qty

      this.$store.dispatch('deleteProductsClassic', classicDoubleItemId)
      this.$store.dispatch('addCartClassic', params)
    },
    updateNewDoubleItemQty (checkNewItemIsDoubleOrNot, params, qty) {
      const newDoubleItemId = checkNewItemIsDoubleOrNot[0].id
      const newDoubleItemOrgQty = checkNewItemIsDoubleOrNot[0].qty

      params.qty = newDoubleItemOrgQty + qty

      this.$store.dispatch('deleteProductsNew', newDoubleItemId)
      this.$store.dispatch('addCartNews', params)
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  h2 {
    font-size: 45px;
  }
  .page {
    display: flex;
    box-sizing: border-box;
    padding-top: 25px;
    div {
      width: 35px;
      height: 35px;
      border: 1px solid #b49782;
      text-align: center;
      .fas {
        font-size: 35px;
      }
    }
    div + div {
      margin-left: 5px;
    }
  }
}
.product {
  .wine {
    width: 100%;
    box-sizing: border-box;
    box-shadow: gray 0 0 8px;
    .introduction {
      width: 100%;
      height: 400px;
      padding: 15px;
      display: flex;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      .product_left {
        width: 60%;
        .year {
          display: flex;
          margin-top: 80px;
          div {
            width: 50px;
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
          div + div {
            margin-left: 15px;
          }
        }
        .sale_price {
          margin: 50px 0 0;
          .sale {
            font-size: 30px;
            color: red;
          }
          .price {
            font-size: 20px;
            text-decoration: line-through;
          }
        }
      }
      .product_right {
        width: 40%;
        text-align: center;
        img {
          max-width: 100%;
          height: 350px;
          object-fit: cover;
        }
      }
      /* products 遮色片*/
      .product_top_detail {
        position: absolute;
        bottom: -401px;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #bfac9a;
        opacity: 0.9;
        transition: all 1s;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        color: white;
        .product_top_detail_inner {
          font-size: 2rem;
        }
      }
      &:hover {
        .product_top_detail {
          bottom: 0px;
        }
      }
    }
    .product_bottom {
      background-color: #c1ad9e;
      padding: 25px;
      .cart_num_out {
        display: flex;
        justify-content: space-around;
        .cart_num {
          width: 100px;
          border: 1px solid white;
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
@media (max-width: 576px) {
  .top {
    justify-content: center;
  }
}
</style>
