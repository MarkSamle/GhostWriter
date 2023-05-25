<template>
  <div class="help-page">
    <div style="padding:15px;">
      <div style="height:50px;display: flex;justify-content: center;align-items: center;">
        <span>欢迎使用</span><span style="margin-left:10px;font-size:20px;font-weight:600;">Ghost Writer</span>
      </div>

      <div style="font-size:15px;">
        <p>
          <span style="margin-left:10px;font-size:15px;font-weight:600;">灵魂写手  Ghost Writer </span>
          <span>是一款参照</span><span style="font-weight:500;">《别人的笔记应用》</span>
          <span>开发的个人笔记、文档离线管理应用。技术上使用了sqlite本地数据库，除自行编辑使用的图片、视频、外部链接等资源、以及OCR识别使用的接口外，Ghost Writer 的注册、登录、编辑等均不使用网络，数据存储在该应用本地的资源夹内，完全的保证了数据的隐私、私有。</span></p>
      </div>
      
      <div style="font-size:12px;color:#707070;height:50px;display: flex;justify-content: center;align-items: center;margin-top:10%;"><span>使用过程中有遇到问题、或者相关的更多信息，可以添加作者微信进行沟通。</span></div>
      
      <div style="height:120px;display: flex;justify-content: center;align-items: center;">
        <div style="padding:5px;width:100px;height:100px;text-align: center;border: 1px solid #707070;border-radius: 5px;float:left;">
          <img src="../../../assets/qrcode.png" style="height:100px;"/>
        </div>
      </div>

      <div style="font-size:12px;color:#707070;height:30px;display: flex;justify-content: center;align-items: center;margin-top:10%;">
        <span>邮箱：</span><span style="font-weight:600;">samlechen@163.com</span>
        <span style="margin:0 10px;"> · </span><span>网站：</span><span style="font-weight:600;">a8a8a8.top</span>
        <span style="margin:0 10px;"> · </span><span>公众号：</span><span style="font-weight:600;">KuaimaLab</span>
        <span style="margin:0 10px;"> · </span><span></span><span style="font-weight:600;">PowerBy © Samle </span><span style="margin:0 10px;"> · </span>2022
      </div>
      


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
  }
}
</script>

<style lang="scss" scoped>
.help-page {
  height: 100%;
}
.el-empty {
  height: 100%;
}
// 使用CSS预处理器scoped让样式只在局部页面生效
</style>
