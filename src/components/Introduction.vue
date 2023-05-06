<template>
  <div class="introduction">
    <Service></Service>
    <b-row class="justify-content-center">
      <b-col cols="5">
        <hr />
      </b-col>
    </b-row>
    <DeliverInfo></DeliverInfo>
  </div>
</template>

<script>
import Service from '@/components/Service.vue'
import DeliverInfo from '@/components/DeliverInfo.vue'

export default {
  name: 'Introduction',
  components: {
    Service,
    DeliverInfo
  }
}
</script>

<style lang="scss" scoped>
.introduction {
  hr {
    background-color: #4f3608;
    height: 2px;
    margin: 50px auto;
  }
}
@media (min-width: 576px) and (max-width: 767px) {
  .introduction {
    hr {
      margin: 25px auto;
    }
  }
}
</style>
