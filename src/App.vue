<template>
  <div id="app">
    <!-- 路由视图占位符 -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
const ipcRenderer = window.require('electron').ipcRenderer
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  mounted(){
    this.toggleDevTools()
  },
  methods: {
    toggleDevTools() {
      window.addEventListener(
        'keydown',
        (e) => {
          const { altKey, ctrlKey, keyCode } = e;
          // ctrl + F12
          if (ctrlKey && keyCode === 123) {
            // 打开控制台
            ipcRenderer.send('f12-tool')
          }
          // all + ctrl + ESC
          if (altKey && ctrlKey && keyCode === 27) {
            // 关闭退出
            ipcRenderer.send('closed-window')
          }
        },
        false
      );
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<style>
html, body, #app {
  background-color: #00000000 !important;
}
*{
  margin:0;
  padding:0;
  border:0;
  /* overflow: hidden; */
  /* overflow-x: hidden; */
}
.el-divider {
  margin:0 !important;
  background-color:#565252 !important;
  height:1px !important;
}
.el-table__body-wrapper::-webkit-scrollbar {
  width: 8px !important;
  height: 8px !important;
}
.el-table__body-wrapper::-webkit-scrollbar-track {
  background-color:#F5F5F5 !important;
  -webkit-border-radius: 2em !important;
  -moz-border-radius: 2em !important;
  border-radius:2em !important;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color:#565252 !important;
  -webkit-border-radius: 2em !important;
  -moz-border-radius: 2em !important;
  border-radius:2em !important;
}
.el-message {
    top: 20px;
    z-index: 999999 !important;
}
</style>
