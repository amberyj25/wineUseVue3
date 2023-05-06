<template>
  <footer>
    <div class="content">
      <div class="left">
        <a href="##">Wine Space</a>
        <p class="copyright">Copyright &copy; 2020 Happy Wine</p>
      </div>
      <div class="right">
        <p>contact</p>
        <p>Email : XXX@gmail.com</p>
        <p>mobile : 09XX-XXX-XXX</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
footer {
  .content {
    background: #f2f0ea;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 25px;
    .left {
      font-size: 15px;
      color: #55381d;
      a {
        font-size: 25px;
        display: block;
        color: #55381d;
      }
    }
    .right {
      color: #55381d;
    }
  }
}
</style>
