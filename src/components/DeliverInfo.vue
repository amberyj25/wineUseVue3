<template>
  <div class="deliver_info">
    <b-row>
      <b-col
        v-for="(deliver, index) in deliverContent"
        :key="index"
        class="content"
        cols="12 mb-5"
        xl="3"
        md="6 mb-0"
        sm="12"
      >
        <img :src="deliver.img" alt="image" class="img"/>
        <div class="text">
          <h5>{{ deliver.title }}</h5>
          <p>{{ deliver.description }}</p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'DeliverInfo',
  data () {
    return {
      deliverContent: [
        {
          title: 'Lorem',
          description: '恆溫的寄送服務',
          img: 'https://i.imgur.com/n0dQExv.jpg'
        },
        {
          title: '滿額',
          description: '購滿$2,000就可免運',
          img: 'https://i.imgur.com/tXiFsE2.jpg'
        },
        {
          title: '寄送服務',
          description: '恆溫的寄送服務',
          img: 'https://i.imgur.com/NkHhto1.jpg'
        },
        {
          title: '寄送服務',
          description: '恆溫的寄送服務',
          img: 'https://i.imgur.com/oxRkSlP.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
/* .deliver_info div {
  justify-content: center;
} */

.content {
  width: 100%;
  height: 500px;
  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    display: block;
    position: relative;
  }
  .text {
    position: relative;
    left: 0;
    bottom: 55px;
    background-color: #8c6e55;
    color: white;
    opacity: 0.8;
    h5, p {
      text-align: center;
    }
  }
}
</style>
