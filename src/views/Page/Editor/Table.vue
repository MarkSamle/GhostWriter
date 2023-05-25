<template>
  <div class="table-page">
      <el-empty description="操作台" :image-size="200"></el-empty>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      userId: window.sessionStorage.getItem('userid'),
    }
  },
  created () {
    
    // console.log(this.chosecolor)
  },
  computed: {
    chosecolor: {
      get () {
        return this.$store.state.storeData.mycolor
      },
      set (value) {
        this.setColor(value)
      }
    },
    ...mapGetters('storeData', [
      'storeDataFrom'
    ])
  },
  methods: {
    ...mapMutations('storeData', ['setColor', ]),
  }
}
</script>

<style lang="scss" scoped>
.table-page {
  height: 100%;
}
.el-empty {
  height: 100%;
}
// 使用CSS预处理器scoped让样式只在局部页面生效
</style>
