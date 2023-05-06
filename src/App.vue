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

export default {
  name: 'App',
  components: {
    HeaderNavbarAndCarousel,
    Introduction,
    Products,
    Footer
  },
  data () {
    return {
      isLoading: true
    }
  },
  methods: {
    getLoadingData (isLoadingData) {
      this.isLoading = isLoadingData
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
