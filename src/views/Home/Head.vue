<template>
    <div class="head-page" :style="{'background-color':chosecolor}">
        <el-container>

          <el-aside class="left-box-buttom">
              <img src="../../assets/logo.png" style="height:50px;width:50px;margin-top:5px"/>
              <el-menu class="left-box-menu" :default-active="menuIndex.toString()" :collapse="true">
                <el-menu-item index="0" @click="toPage(0)" :style="{'color':chosecolor}">
                  <i class="el-icon-s-home" style="font-size: 40px;margin-bottom: 10px;"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="1" @click="toPage(1)" :style="{'color':chosecolor}">
                  <i class="el-icon-s-management" style="font-size: 40px;margin-bottom: 10px;"></i>
                  <span slot="title">文集管理</span>
                </el-menu-item>
                <el-menu-item index="2" @click="toPage(2)" :style="{'color':chosecolor}">
                  <i class="el-icon-s-order" style="font-size: 40px;margin-bottom: 10px;"></i>
                  <span slot="title">文档管理</span>
                </el-menu-item>
                <el-menu-item index="3" @click="toPage(3)" :style="{'color':chosecolor}">
                  <i class="el-icon-s-opportunity" style="font-size: 40px;margin-bottom: 10px;"></i>
                  <span slot="title" >素材管理</span>
                </el-menu-item>
                <el-menu-item index="4" @click="toPage(4)" :style="{'color':chosecolor}">
                  <i class="el-icon-s-help" style="font-size: 40px;margin-bottom: 10px;"></i>
                  <span slot="title" >工具箱</span>
                </el-menu-item>
                <el-menu-item index="5" @click="toPage(5)" :style="{'color':chosecolor}">
                  <i class="el-icon-s-tools" style="font-size: 40px;margin-bottom: 10px;"></i>
                  <span slot="title">设置</span>
                </el-menu-item>
              </el-menu>
              <div class="icon-buttom" :style="{'color':chosecolor}">
                <i class="el-icon-back" @click="loginout()"></i>
              </div>
          </el-aside>
            <el-main class="right-box">
              <div class="right-box-buttom" :style="{'background-color':chosecolor}">
                <span :style="{'color':chosecolor,'filter': 'invert(100%)'}" class="main-title">Ghost Writer</span>
                  <!-- <div style="height:2px;"></div> -->
                <div class="min-buttom-close" :style="{'color':chosecolor}">
                  <i class="el-icon-close" @click="winclose"></i>
                </div>
                <div class="min-buttom" :style="{'color':chosecolor}">
                  <i class="el-icon-copy-document" @click="winbigger"></i>
                </div>
                <div class="min-buttom" :style="{'color':chosecolor}">
                  <i class="el-icon-minus" @click="winsmaller"></i>
                </div>
                <div class="min-buttom-color" style="float:right;margin-right:10px;">
                    <el-color-picker v-model="chosecolor" :predefine="predefineColors" @change="mycolor" show-alpha></el-color-picker>
                </div>
                  
              </div>
              <!-- 高度占位 -->
              <div style="height:30px;"></div>
              <div class="right-box-down">
                <router-view></router-view>
              </div>
          </el-main>

        </el-container>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
const ipcRenderer = window.require('electron').ipcRenderer
export default {
  data () {
    return {
      isBig: true,
      title: 'Ghost Writer',
      // chosecolor: '#565252',
      predefineColors: [
        '#CD7272',
        '#F49F4F',
        '#C1C446',
        '#517E4E',
        '#5791D9',
        '#0098A3',
        '#A944E4',
        '#F088F2',
        '#000000',
        '#565252'
      ],
      newsCount: 100,
      menuIndex: 0,
      list1: []
    }
  },
  created () {
    // this.getlist1()
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
    userData: {
      get () {
        return this.$store.state.userData
      },
      set (value) {
        this.setUser(value)
      }
    },
    ...mapGetters('storeData', [ 'storeDataFrom' ]),
    ...mapGetters('userData', [ 'userDataFrom' ])
  },
  watch: {
    $route: {
      handler: function(val, oldVal){
        var paths = {'/home':0, '/collect':1,'/doc':2,'/files':3,'/tool':4,'/setup':5}
        if (val.meta.title) { this.title = val.meta.title }
        if (paths.hasOwnProperty(val.path)) { this.menuIndex = paths[val.path]}
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    ...mapMutations('storeData', ['setColor', ]),
    ...mapMutations('userData', ['setUser', ]),
    winsmaller () {
    //   const ipcRenderer = window.electron.ipcRenderer
      ipcRenderer.send('hide-window')
    },
    winbigger () {
      if (this.isBig) {
        // const ipcRenderer = window.electron.ipcRenderer
        ipcRenderer.send('show-window')
      } else {
        // const ipcRenderer = window.electron.ipcRenderer
        ipcRenderer.send('orignal-window')
      }
      this.isBig = !this.isBig
    },
    winclose () {
    //   const ipcRenderer = window.electron.ipcRenderer
      ipcRenderer.send('closed-window')
    },
    loginout () {
      window.sessionStorage.clear()
      this.userData = {username:this.userData.username}
      this.$router.push('/login')
      const news = {
        title: '退出',
        body: '退出成功',
        silent: false, // false有声音，true没声音
        icon: '../../assets/logo.png',
        timeoutType: 'default' // 通知的超时持续时间 'default' or 'never'
      }
      this.$notice(news)
    },
    mycolor () {
      if (this.$refs.mycolor) {
        this.$refs.mycolor.$el.style.setProperty(
          '--thecolor',
          this.chosecolor
        )
      }
    //   this.$refs.mycolor.$el.style.setProperty(
    //     '--nav-active-color',
    //     this.chosecolor
    //   )
    },
    toPage (index) {
      var paths = ['/home', '/collect','/doc','/files','/tool','/setup']
      if (this.menuIndex != index ){ this.$router.push(paths[index]) }
    },
  }
}
</script>

<style lang="scss" scoped>
// 使用CSS预处理器scoped让样式只在局部页面生效
.head-page {
  height: 100vh;
  // background-color: rgb(255, 1, 1);
  // background-color: this.color;
}
.main-title {
  font-size: 15px;
  padding:10px;
}
.el-container {
  height: 100%;
  margin:0;
  padding:0;
  border:0;
}
.el-aside {
  margin:0;
  padding:0;
  border:0;
}
.el-main {
  margin:0;
  padding:0;
  border:0;
}
.left-box {
  width: 200px !important;
  height: 100%;
  // background-color: rgba(255, 255, 255, 0.274);
}
.left-box-buttom {
  -webkit-app-region: drag;
  width: 50px !important;
  height: 100%;
  background-color: rgb(70, 70, 70);
}
.left-box-menu {
  -webkit-app-region: no-drag;
  width: 50px;
}
.el-menu {
  background-color: rgb(70, 70, 70);
  margin:0;
  padding:0;
  border:0 !important;
}
.el-menu-item {
  margin:0;
  padding:0 !important;
  border:0;
  padding-left:0px;
  height: 60px;
  line-height: 60px;
  /deep/ .el-tooltip {
    margin:0;
    padding:5px !important;
    border:0;
    padding-left:0px;
  }
}
/deep/ .el-badge__content {
  margin-top: 10px;
  margin-right: 3px;
  // float: left !important;
}
.icon-buttom {
  cursor: pointer;
  position:fixed;
  bottom:0;
  -webkit-app-region: no-drag;
  // color: #ffffff;
  padding: 5px;
  font-size: 40px;
  &:hover {
    background-color: #ffffff;
  }
}
.left-box-list {
  width: 150px !important;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
}
.right-box {
  width: -webkit-calc(100% - 50px) !important;
  height: 100%;
  // background-color: rgb(11, 247, 255);
}
.right-box-buttom {
  -webkit-app-region: drag;
  height: 29px;
  background-color: rgba(255, 255, 255, 0);
  border-bottom: 1px solid #c0ccda;
  position: fixed;
  width: inherit;
  top: 0px;
  z-index: 999;
}
.right-box-down {
  background-color: rgba(255, 255, 255, 0.8);
  height: -webkit-calc(100% - 30px) !important;
}
.min-buttom-color {
  cursor: pointer;
  -webkit-app-region: no-drag;
  padding: 2px;
  // color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin-left: 2px;
  display: inline;
  &:hover {
    background-color: #ffffff;
  }
}
.min-buttom {
  cursor: pointer;
  -webkit-app-region: no-drag;
  padding: 2px;
  // color: #ffffff;
  filter: invert(100%);
  font-size: 20px;
  font-weight: 600;
  margin-left: 2px;
  float: right;
  display: inline;
  &:hover {
    background-color: #000000;
  }
}
.min-buttom-close {
  cursor: pointer;
  -webkit-app-region: no-drag;
  padding: 2px;
  // color: #ffffff;
  filter: invert(100%);
  font-size: 20px;
  font-weight: 600;
  margin-left: 2px;
  float: right;
  display: inline;
  &:hover {
    background-color: #1D7C80;
  }
}
/deep/ .el-color-picker {
  display: inline;
  border-radius: 0px;
  position: relative;
  cursor: pointer;
  width: 20px !important;
  height: 20px !important;
  margin:0px !important;
  padding:0px !important;
  border:0px !important;
}
/deep/ .el-color-picker__trigger {
  // display: inline;
  border-radius: 0px;
  position: relative;
  cursor: pointer;
  top: 3px !important;
  width: 20px !important;
  height: 20px !important;
  margin:0px !important;
  padding:0px !important;
  border:0px !important;
  .el-color-picker__color {
    // display: inline;
    position: relative;
    display: block;
    box-sizing: border-box;
    border: 0px;
    border-radius: 0px;
    width: 100%;
    height: 100%;
    text-align: center;
  }
}
/deep/ .nav-default-tree .nav-default-list li>a {
  background-color: #00000000 !important;
}
#nav {
  --thecolor: #5791D9;
  /deep/ .nav-default-list li.active>a {
    color: var(--thecolor) !important;
    border-right: 2px solid var(--thecolor) !important;
  }
}
#nav {
  --thecolor: #5791D9;
  /deep/ .nav-default-list li.active>a:after {
    color: var(--thecolor) !important;
    border-right-color: var(--thecolor) !important;
  }
}
#nav {
  --thecolor: #5791D9;
  /deep/ .nav-default-list li:hover:before {
    color: var(--thecolor) !important;
    background-color: var(--thecolor) !important;
  }
}
</style>
