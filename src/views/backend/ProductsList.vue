<template>
  <div style="display: flex;">
      <div>
        <Sidebar />
      </div>
      <div style="width: 1000px;">
        <div>
          <div class="title">經典款</div>
          <b-table striped hover :items="productsClassic"></b-table>
        </div>
        <div>
          <div class="title">新款</div>
          <b-table striped hover :items="productsNew"></b-table>
        </div>
      </div>
  </div>
</template>

<script>
import { computed , onMounted } from '@vue/composition-api'
import { useStore } from "@/store"
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'ProductList',
  components: {
    Sidebar
  },
  setup() {
    const store = useStore();
    const productsClassic = computed(() => {
      return store.getters.orgProductsClassic.map(product => {
        return {
          title: product.title,
          id: product.id,
          origin_price: product.origin_price,
          price: product.price
        }
      });
    });

    const productsNew = computed(() => {
      return store.getters.orgProductsNews.map(product => {
        return {
          title: product.title,
          id: product.id,
          origin_price: product.origin_price,
          price: product.price
        }
      });
    });

    onMounted(() => {
      store.dispatch('getOrgProductsClassic');
      store.dispatch('getOrgProductsNews');
    });

    return {
      productsClassic,
      productsNew
    }
  }
}
</script>

<style  lang="scss" scoped>
.title {
  font-size: 35px;
}
</style>