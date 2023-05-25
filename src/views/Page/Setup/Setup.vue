<template>
  <div class="setup-page">
    <div style="padding:15px;width:60px;text-align: center;float:left;">
      <div><el-button type="text" @click="toHelp()" size="mini" style="font-size:50px;color:#525252;"><i class="el-icon-question" style="font-size:50px;"></i></el-button></div>
      <div>关于Ghost</div>
    </div>

    <div style="padding:15px;width:60px;text-align: center;float:left;">
      <div><el-button type="text" @click="toSetEditor()" size="mini" style="font-size:50px;color:#525252;"><i class="el-icon-edit-outline" style="font-size:50px;"></i></el-button></div>
      <div>编辑器设置</div>
    </div>
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
    toSetEditor(){
      this.$router.push('/editorset')
    },
    toHelp(){
      this.$router.push('/help')
    },
  }
}
</script>

<style lang="scss" scoped>
.setup-page {
  height: 100%;
}
.el-empty {
  height: 100%;
}
// 使用CSS预处理器scoped让样式只在局部页面生效
</style>
