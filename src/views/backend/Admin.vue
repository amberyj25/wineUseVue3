<template>
  <div style="display: flex">
    <div>
      <Sidebar />
    </div>

    <div class="col-md-10 my-5">
      <div class="container">
        <div id="main" style="width: 100%; height: 400px" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Sidebar.vue'

// 在组件加载后初始化ECharts图表
import * as echarts from 'echarts'

export default {
  name: 'Admin',
  components: {
    Sidebar
  },
  setup() {
    function render() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '銷售量'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['VB', 'VJ', 'VR', 'VG', 'VH', 'VA']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }

    onMounted(() => {
      render()
    })

    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}
.sidebar {
  width: 250px;
}
.sidebar-style {
  height: 800px;
  background-color: rgba(0, 0, 0, 0);
}

a {
  text-decoration: none;
  background-color: transparent;
  color: #F3E1AA;
}

.router-link-exact-active {
  color: #F2CA52;
  font-weight: bold;
}

.sidebar {
  border-right: 2px double #F3F6E0;
  margin-top: 75px;
}

.sidebar-sticky {
  position: sticky;
  left: 0px;
  top: 100px;
}
.container {
  max-width: 1200px;
  padding: 35px;
}
</style>