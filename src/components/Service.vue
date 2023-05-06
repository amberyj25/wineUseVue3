<template>
  <div class="service">
    <b-row>
      <b-col
        v-for="(service, index) in serviceContent"
        :key="index"
        cols="12"
        lg="4"
      >
        <i :class="service.style"></i>
        <div class="detail">
          <h4>{{ service.title }}</h4>
          <p>{{ service.description }}</p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Service',
  data () {
    return {
      serviceContent: [
        {
          title: '酒品',
          description: '最棒的酒款',
          style: 'fas fa-wine-glass-alt'
        }, {
          title: '滿額',
          description: '購滿$2,000就可免運',
          style: 'fas fa-comment-dollar'
        }, {
          title: '寄送服務',
          description: '恆溫的寄送服務',
          style: 'fas fa-truck'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.service {
  text-align: center;

  i {
    display: block;
    margin: auto;
    font-size: 150px;
    color: gray;
  }

  .detail {
    margin: 25px;
    h4, p {
      text-align: center;
    }
    h4 {
      font-size: 20px;
    }
    p {
      font-size: 15px;
    }
  }
}
</style>
