<template>
  <div class="container">
    <loading :active.sync="isLoading"></loading>

    <div v-for="(category, index) in categoryProducts" :key="index">
      <h1>{{ category.title }}</h1>
      <table>
        <tr>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
          <th>總額</th>
        </tr>
        <tr v-for="(product, index) in category.data" :key="index">
          <td>{{ product.product.title }}</td>
          <td>{{ product.qty }}瓶</td>
          <td>{{ product.product.price }}</td>
          <td>${{ product.total }}</td>
        </tr>
      </table>
    </div>
    <div class="total">
      <!-- <h1>total</h1> -->
      <div class="totalContent">
        <span>總計 : </span>
        <span>{{ totalPrice }}</span>
      </div>
    </div>
    <div class="submit">
      <div v-for="(btn, btnNum) in submitBtn" :key="btnNum" :class="btn.class" @click="changePage(btn)">{{ btn.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from '@vue/composition-api';
import { useRoute } from "@/useRoute.js";
export default {
  name: 'CheckoutShoppingCartContent',
  props: {
    classicProductData: {
      type: Array,
      default: () => []
    },
    newProductData: {
      type: Array,
      default: () => []
    }
  },
  emits: ['changeComponent'],
  setup(props, { emit }) {
    const { router } = useRoute();
    const classicData = reactive({});
    const newData = reactive({});
    const classicAndNewData = reactive([]);
    const submitBtn = reactive([
      {
        title: '繼續購物',
        class: 'btn_shopping'
      }, {
        title: '確認訂購',
        class: 'btn_submit'
      }
    ]);
    const isLoading = ref(true);

    const categoryProducts = computed(() => {
      classicData['title'] = 'classic (經典款)';
      classicData['data'] = props.classicProductData;
      newData['title'] = 'new (新款)';
      newData['data'] = props.newProductData;

      if (classicData['data'] && newData['data']) isLoading.value = !isLoading.value;

      return [ classicData, newData];
    });
    const totalPrice = computed(() => {
      const tempArray = [...props.classicProductData, ...props.newProductData];
      const total = tempArray.reduce((prev, currentItem, currentItemIndex, array) => {
        return prev + currentItem.total
      }, 0)

      return total
    });

    const changePage = (btn) => {
      switch (btn.title) {
        case '繼續購物':
          router.push('/');
          break;
        case '確認訂購':
          emit('changeComponent', 'CheckoutCustomerForm');
          break;
      }
    }

    return {
      props,
      classicData,
      newData,
      classicAndNewData,
      submitBtn,
      isLoading,
      categoryProducts,
      totalPrice,
      changePage
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 85%;
  margin: auto;

  h1 {
    font-size: 1.5rem;
    margin: 25px 0;
  }

  table {
    width: 100%;

    tr {
      line-height: 2.5;

      th,
      td {
        width: 25%;
        text-align: center;
      }

      th {
        background-color: bisque;
      }

      td {
        border-bottom: 1px solid #7B7B7B;
      }
    }
  }

  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25px 0;

    h1 {
      margin: 0;
    }

    .totalContent {
      span {
        font-size: 1.2rem;
      }
    }
  }

  .submit {
    display: flex;
    justify-content: center;

    .btn_shopping,
    .btn_submit {
      padding: 5px 25px;
      border-radius: 5px;
      margin: 0 25px;
      text-align: center;
    }

    .btn_shopping {
      border: 2px solid blueviolet;

      &:hover {
        color: white;
        background-color: #FF3EFF;
        cursor: pointer;
      }
    }

    .btn_submit {
      border: 2px solid red;

      &:hover {
        color: white;
        background-color: #fe5050;
        cursor: pointer;
      }
    }
  }
}
</style>
