<template>
  <div>
    <div class="nav_bar_root">
      <Navbar></Navbar>
    </div>
    <div class="container">
      <h1>結帳</h1>
      <div class="checkout_sop">
        <div v-for="(item, index) in checkoutSop" :key="index" class="checkout_sop_item"
          :class="{ 'checkout_sop_item': true, bgColor: changeTab === item.component }">
          <h2> {{ item.title }} </h2>
        </div>
      </div>
      <div class="checkout_sop_content">
          <component :is="changeTab" :classicProductData="classicProductData" :newProductData="newProductData"
            @changeComponent="changeComponent"
          ></component>
      </div>

    </div>
  </div>
</template>
<script>
import { reactive, ref, onMounted, computed, watch } from '@vue/composition-api'
import Navbar from '@/components/Navbar.vue'
import CheckoutShoppingCartContent from '@/components/CheckoutShoppingCartContent.vue'
import CheckoutCustomerForm from '@/components/CheckoutCustomerForm.vue'
import { useStore } from "@/store"

export default {
  name: 'Checkout',
  components: {
    Navbar,
    CheckoutShoppingCartContent,
    CheckoutCustomerForm
  },
  setup() {
    const store = useStore();
    const componentTab = ref('CheckoutShoppingCartContent');

    onMounted(() => getData());

    const classicProductData = computed(() => store.state.currentShoppingCartClassic);
    const newProductData = computed(() => store.state.currentShoppingCartNew);
    const changeTab = computed(() => componentTab.value);
    const checkoutSop = computed(() => [
      {
        title: '1.確認購物車內容',
        component: 'CheckoutShoppingCartContent'
      },
      {
        title: '2.輸入收件人資料',
        component: 'CheckoutCustomerForm'
      }
    ]);

    watch(componentTab, (n, o) => {
      if (n === 'CheckoutCustomerForm') return;

      getData();
    });

    const getData = () => {
      store.dispatch('getCurrentShoppingCartClassic');
      store.dispatch('getCurrentShoppingCartNew');
    };
    const changeComponent = (component) => { componentTab.value = component };

    return {
      componentTab,
      classicProductData,
      newProductData,
      changeTab,
      checkoutSop,
      getData,
      changeComponent
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

      h2 {
        font-size: 1rem;
        font-weight: 400;
        text-align: center;
      }
    }

    .bgColor {
      background-color: #00FFFF;
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
