<template>
  <div>
    <div class="carousel" v-for="(carousel, index) in carouselContent" :key="index">
      <img :src="carousel.img" class="img" alt="img" />
      <div class="alltabs">
        <i
          v-for="carouselNum in carouselContentData.length"
          :key="carouselNum"
          :class="{fas: true, 'fa-circle': true, fa_circle_style:currentCarouselContentId === carouselNum}"
          @click="changeTab(carouselNum)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  data () {
    return {
      carouselContentData: [
        {
          id: 1,
          img: 'https://i.imgur.com/6x0J234.jpg'
        },
        {
          id: 2,
          img: 'https://i.imgur.com/TBHJmjv.jpg'
        },
        {
          id: 3,
          img: 'https://i.imgur.com/NCbpT18.jpg'
        }
      ],
      currentCarouselContentId: 1
    }
  },
  computed: {
    carouselContent () {
      return this.carouselContentData.filter(
        item => item.id === this.currentCarouselContentId
      )
    }
  },
  mounted () {
    this.timer()
  },
  methods: {
    timer () {
      return setInterval(() => {
        this.getData()
      }, 3000)
    },
    getData () {
      if (this.currentCarouselContentId === this.carouselContentData.length) {
        this.currentCarouselContentId = 1
        return
      }

      this.currentCarouselContentId += 1
    },
    changeTab (carouselNum) {
      this.currentCarouselContentId = carouselNum
    }
  }
}
</script>
<style lang="scss" scoped>
.carousel {
  position: relative;
  .img {
    width: 100%;
    height: 590px;
  }
  .alltabs {
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 25px;
    .fa-circle {
      margin: 0 25px;
      font-size: 0.7rem;
      color: white;
    }
    .fa_circle_style {
      color: #0080ff;
    }
  }
}
@media (min-width: 992px) and (max-width: 1200px) {
  .carousel {
    .img {
      height: 450px;
    }
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .carousel {
    .img {
      height: 400px;
    }
  }
}
@media (min-width: 576px) and (max-width: 767px) {
  .carousel {
    .img {
      height: 300px;
    }
  }
}
@media (max-width: 575px) {
  .carousel {
    .img {
      height: 250px;
    }
  }
}
</style>
