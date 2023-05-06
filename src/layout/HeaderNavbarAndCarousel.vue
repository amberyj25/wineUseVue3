<template>
  <header>
    <Navbar></Navbar>

    <Carousel></Carousel>
  </header>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Carousel from '@/components/Carousel.vue'

export default {
  name: 'HeaderNavbarAndCarousel',
  components: {
    Navbar,
    Carousel
  }
}
</script>
<style scoped>
</style>
