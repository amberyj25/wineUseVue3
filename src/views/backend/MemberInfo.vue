<template>
  <div style="display: flex;">
    <div>
      <Sidebar />
    </div>
    <div style="width: 1000px;">
      <div class="title">管理員</div>
      <b-table striped hover :items="memberInfo"></b-table>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useStore } from "@/store"
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'MemberInfo',
  components: {
    Sidebar
  },
  setup() {
    const store = useStore();
    const memberInfo = computed(() => {
      return [
        {
          id: 1,
          name: 'Amber',
          email: 'amber@gmail.com'
        }, {
          id: 2,
          name: 'Leopoldo',
          email: 'leopoldo@gmail.com'
        }, {
          id: 3,
          name: 'Delphine',
          email: 'delphine@gmail.com'
        }
      ]
    });

    return {
      memberInfo,
    }
  }
}
</script>

<style  lang="scss" scoped>
.title {
  font-size: 35px;
}
</style>