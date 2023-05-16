<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>

    <HeaderNavbarAndCarousel></HeaderNavbarAndCarousel>

    <main>
      <div class="container">
        <Products
          @getLoadingData="getLoadingData"
        ></Products>
        <Introduction></Introduction>
      </div>
    </main>

    <Footer></Footer>
  </div>
</template>

<script>
import HeaderNavbarAndCarousel from '@/layout/HeaderNavbarAndCarousel.vue'
import Introduction from '@/components/Introduction.vue'
import Products from '@/components/Products.vue'
import Footer from '@/layout/Footer.vue'
import { ref } from '@vue/composition-api'

export default {
  name: 'App',
  components: {
    HeaderNavbarAndCarousel,
    Introduction,
    Products,
    Footer
  },
  setup() {
    const isLoading = ref(true);
    const getLoadingData = (isLoadingData) => {
      isLoading.value = isLoadingData;
    };

    return {
      isLoading,
      getLoadingData
    }
  }
}
</script>

<style  lang="scss" scoped>
.container {
  max-width: 1400px !important;
  padding: 35px;
}
</style>
