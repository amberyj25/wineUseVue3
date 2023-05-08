<template>
  <div>
    <HeaderNavbar class="header_img"></HeaderNavbar>

    <main class="container">
      <div class="filter">
        <h5 class="title">酒品分類</h5>
        <div v-for="(category, index) in wineCategory" :key="index" class="category">
          <p :class="{ current_category: categoryRender === category }" @click="getCategory(category)">{{ category }}</p>
        </div>
      </div>

      <div class="products_outer">
        <loading :active.sync="isLoading"></loading>
        <div v-for="(category, index) in categoryProducts" :key="index" class="products">
          <b-row class="products_category">
            <b-col cols="12">
              <h2>{{ category.title }}</h2>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="product" cols="12 mb-5" md="6" lg="6" xl="3" v-for="(product, index) in category.data"
              :key="index">
              <div class="product_inner">
                <div class="product_top">
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
                    <div class="more">
                      <p class="text" @click="getDetail(product.id, category.title)">點擊看更多介紹</p>
                    </div>
                  </div>
                  <div class="product_right">
                    <img :src="product.image" alt="product" />
                  </div>
                </div>
                <div class="product_bottom">
                  <div class="cart_num_out">
                    <select class="cart_num" v-model="product.productNum">
                      <option :value="num" v-for="(num, index) in 10" :key="index">{{ num }}</option>
                    </select>
                    <button @click="addCart(product.title, product.id, product.productNum)">Add to cart</button>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
    </main>

    <Footer></Footer>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed, watch } from '@vue/composition-api'
import { useStore } from "@/store"
import { useRoute } from "@/useRoute.js";
import HeaderNavbar from '@/layout/HeaderNavbar.vue'
import Footer from '@/layout/Footer.vue'

export default {
  name: 'ProductsPage',
  components: {
    HeaderNavbar,
    Footer
  },
  setup() {
    const store = useStore();
    const { router } = useRoute();
    const wineCategory = reactive(['新款', '經典款', '全部酒品']);
    const categoryRender = ref('全部酒品');
    const classicAndNewData = reactive([]);
    const isLoading = ref(true);
    const searchProductCategory = computed(() => store.state.searchProductCategory);
    const categoryProducts = computed(() => {
      // 這個頁面 的 產品呈現 是由 category 選擇所呈現, category 有分成  經典款 / 新款
      // 這個頁面 的 category 選擇可以來自於 Navbar  的 search 功能 或 這個頁面的 酒品分類選單
      // if 這行主要判斷 是 使用到 Navbar search 功能, 還是使用 這個頁面的 酒品分類選單
      // 使用 Navbar search 功能 - 才會 觸發 checkSearchProductCategory()
      // 使用 這個頁面的 酒品分類選單 - 不會 觸發 checkSearchProductCategory()
      if (searchProductCategory) checkSearchProductCategory()

      switch (categoryRender.value) {
        case '新款':
          return classicAndNewData.filter(item => item.title === '新款');
        case '經典款':
          return classicAndNewData.filter(item => item.title === '經典款');
        case '全部酒品':
          return classicAndNewData;
      }
    });
    const checkSearchProductCategory = () => {
      switch (searchProductCategory) {
        case '新款':
          categoryRender.value = '新款';
          store.commit('navbarSearchProductCategory', '');
          break
        case '經典款':
          categoryRender.value = '經典款';
          store.commit('navbarSearchProductCategory', '');
          break
      }
    };
    const addCart = (title, id, qty) => {
      const titleSplit = title.split('');
      const params = {
        product_id: id,
        qty: qty
      };
      // 判斷 新增加的product是否與當前 shoppingCart 內的 item 有相同
      checkItemIsDoubleOrNot(titleSplit, params, qty, id);
    };
    const checkItemIsDoubleOrNot = (titleSplit, params, qty, id) => {
      const checkClassicItemIsDoubleOrNotArray = store.state.currentShoppingCartClassic.filter(item => item.product.id === id)
      const checkNewItemIsDoubleOrNotArray = store.state.currentShoppingCartNew.filter(item => item.product.id === id)
      if (checkClassicItemIsDoubleOrNotArray.length !== 0 || checkNewItemIsDoubleOrNotArray.length !== 0) {
        checkDoubleItemCategory(titleSplit, checkClassicItemIsDoubleOrNotArray, checkNewItemIsDoubleOrNotArray, params, qty)
        return
      }
      // 經過 上面 判斷新增加的product是否有與當前 shoppingCart 的 item有相同, 沒有才會繼續從這邊往下跑
      switch (titleSplit[0]) {
        case 'A':
        case 'B':
          store.dispatch('addCartClassic', params)
          break
        case 'V':
          store.dispatch('addCartNews', params)
          break
      }
    };
    const checkDoubleItemCategory = (titleSplit, checkClassicItemIsDoubleOrNot, checkNewItemIsDoubleOrNot, params, qty) => {
      switch (titleSplit[0]) {
        case 'A':
        case 'B':
          updateClassicDoubleItemQty(checkClassicItemIsDoubleOrNot, params, qty)
          break
        case 'V':
          updateNewDoubleItemQty(checkNewItemIsDoubleOrNot, params, qty)
          break
      };
    };
    const updateClassicDoubleItemQty = (checkClassicItemIsDoubleOrNot, params, qty) => {
      const classicDoubleItemId = checkClassicItemIsDoubleOrNot[0].id
      const classicDoubleItemOrgQty = checkClassicItemIsDoubleOrNot[0].qty

      params.qty = classicDoubleItemOrgQty + qty

      store.dispatch('deleteProductsClassic', classicDoubleItemId)
      store.dispatch('addCartClassic', params)
    };
    const getCategory = (category) => {
      switch (category) {
        case '新款':
          categoryRender.value = '新款'
          break
        case '經典款':
          categoryRender.value = '經典款'
          break
        case '全部酒品':
          categoryRender.value = '全部酒品'
          break
      };
    };
    const updateNewDoubleItemQty = (checkNewItemIsDoubleOrNot, params, qty) => {
      const newDoubleItemId = checkNewItemIsDoubleOrNot[0].id;
      const newDoubleItemOrgQty = checkNewItemIsDoubleOrNot[0].qty;

      params.qty = newDoubleItemOrgQty + qty;

      store.dispatch('deleteProductsNew', newDoubleItemId);
      store.dispatch('addCartNews', params);
    };
    const getDetail = (id, category) => {
      const query = {
        id: id,
        category: category
      };
      router.push({
        name: 'SingleProduct',
        query
      });
    };
    onMounted(() => {
      store.dispatch('getOrgProductsClassic');
      store.dispatch('getOrgProductsNews');
      store.dispatch('getCurrentShoppingCartClassic');
      store.dispatch('getCurrentShoppingCartNew');
    });
    watch(() => store.state.orgProductsNews, (n, o) => {
      const tempNewData = {
        title: '新款',
        data: n
      };

      classicAndNewData.push(tempNewData);
    });
    watch(() => store.state.orgProductsClassic, (n, o) => {
      const tempNewData = {
        title: '經典款',
        data: n
      };

      classicAndNewData.push(tempNewData);
      isLoading.value = false;
    });

    return {
      wineCategory,
      categoryRender,
      classicAndNewData,
      isLoading,
      searchProductCategory,
      categoryProducts,
      checkSearchProductCategory,
      addCart,
      checkItemIsDoubleOrNot,
      checkDoubleItemCategory,
      updateClassicDoubleItemQty,
      getCategory,
      updateNewDoubleItemQty,
      getDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.header_img {
  width: 100%;
  height: 550px;
  background: url("../assets/banner.jpg") no-repeat 50% 55%;
  background-size: cover;
}

.container {
  max-width: 1400px;
  width: 100%;
  padding: 0 25px;
  display: flex;

  .filter {
    width: 15%;
    height: 400px;
    margin: 55px 20px 0 0;
    box-sizing: border-box;
    box-shadow: 0 0 3px black;

    .title,
    .category {
      text-align: center;
      line-height: 100px;
      height: 100px;
      margin: 0;
      border-bottom: 1px solid gray;
    }

    .title {
      background-color: #7f5c5c;
      color: white;
    }

    .category {
      .current_category {
        background-color: #c1ad9e;
      }

      p {
        &:hover {
          background-color: #e7bc91;
          cursor: pointer;
        }
      }
    }
  }

  .products_outer {
    width: 85%;

    .products {
      margin: 55px 0;

      .products_category {
        h2 {
          font-size: 50px;
        }
      }

      .product {
        .product_inner {
          width: 100%;
          box-sizing: border-box;
          box-shadow: gray 0 0 8px;

          .product_top {
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
                margin-top: 30px;

                div+div {
                  margin-left: 15px;
                }

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

              .more {
                .text {
                  margin: 10px 0 0;
                  color: #7f5c5c;

                  &:hover {
                    color: #8B4513;
                  }
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
          }

          .product_bottom {
            background-color: #c1ad9e;
            padding: 20px;

            .cart_num_out {
              display: flex;
              justify-content: space-around;

              .cart_num {
                width: 35%;
                height: 45px;
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
    }
  }
}

@media (max-width: 992px) {
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .filter {
      width: 85%;
      margin: 55px 0 0 0;
    }
  }
}</style>