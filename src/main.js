import Vue from "vue"
import App from "./App.vue"
// import "./registerServiceWorker"

import router from "./router"
import store from "./store"

// 引入Element-ui
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

// 引入全局样式表
// import "./assets/css/global.css"

// 导入 NProgress进度条包对应的JS和CSS
import NProgress from "nprogress"
import "nprogress/nprogress.css"

// 引入axios
import axios from "axios"

// md5加密
import md5 from "js-md5"

// 引入滚动条插件
import GeminiScrollbar from "vue-gemini-scrollbar"

// 引入无缝滚动插件
import scroll from "vue-seamless-scroll"

// 引入时间格式
import moment from "moment"

// 引入导航菜单
import VueNavTree from "vue-nav-tree"

// 引入electron通知
import { notice } from "./electron"
Vue.prototype.$notice = notice

// 引入数据库
const fs = window.require("fs")
const path = require("path")
// ---------使用__static.replace('app.asar','app')替换路径
const dbPath = path.join(__static.replace('app.asar','app'),"db/sqlite.db")
// ---------

var initSqlJs = require("@/database/js/sql-asm.js")
var filebuffer = fs.readFileSync(dbPath)
initSqlJs().then(function(SQL){
  Vue.prototype.$db = new SQL.Database(filebuffer)
})
Vue.prototype.setDb = function() {
  initSqlJs().then(function(SQL){
    Vue.prototype.$db = new SQL.Database(filebuffer)
  })
}


// 后端接口
axios.defaults.baseURL = ""//"http://127.0.0.1:8000"//"https://127.0.0.1:8000"
// 在 request 拦截器中，展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = "Bearer " + window.sessionStorage.getItem("token")
  return config
})

// 在 response 拦截器中，隐藏进度条 Nprogress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

// 设置axios别名，方便调用
Vue.prototype.$http = axios
// 设置md5别名
Vue.prototype.$md5 = md5
// 引入滚动条插件
Vue.use(GeminiScrollbar)
// 引入无缝滚动插件
Vue.use(scroll)
// 引入导航菜单
Vue.use(VueNavTree)
// 时间格式YYYY-MM-DD  HH:mm:ss
Vue.filter("moment", function (value, formatString) {
  formatString = formatString || "YYYY-MM-DD HH:mm:ss"
  if (value) return moment(value).format(formatString)
})
Vue.use(ElementUI)
Vue.config.productionTip = false
// 设置显示meta属性
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = "Ghost Writer"
  }
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
