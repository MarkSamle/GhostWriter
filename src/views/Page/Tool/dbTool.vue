<template>
  <div class="db-tool-page">
    <div style="padding:15px;">
      <div style="margin-bottom: 10px;border-bottom: 1px solid #c0ccda;;">
          <el-button type="text" @click="back()" size="mini" style="font-size:20px;color:#525252;"><i class="el-icon-arrow-left" style="font-size:20px;"></i>  数据库工具</el-button>
      </div>

      <div style="margin:5px;">
        <span style="font-weight: 600;font-size:15px;color:green;">导出数据库：</span>
      </div>
      <el-input v-model="savePath" placeholder="选择保存路径" clearable style="margin:5px;">
        <el-button slot="append"  size="small" @click="getPath" v-if="savePath == ''">选择路径</el-button>
        <el-button  slot="append"  size="small" @click="saveData" v-else>导出数据</el-button>
      </el-input>
      <div style="margin:5px;">
        <span style="font-weight: 600;font-size:15px;color:red;">导入数据库：</span>
      </div>
      <el-input v-model="upPath" placeholder="选择保存路径" clearable style="margin:5px;" >
        <el-upload slot="append"
          v-if="upPath == ''"
          accept=".db"
          class="upload-box"
          action=""
          :show-file-list="false"
          :auto-upload="false"
          :multiple="false"
          :file-list="files"
          :on-change="changeFile">
          <el-button slot="trigger" size="small" >选取文件</el-button>
        </el-upload>
        <el-button  slot="append"  size="small" @click="upData" v-else>导入数据</el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
const ipcRenderer = window.require('electron').ipcRenderer
const fs = window.require('fs')
var initSqlJs = require('@/database/js/sql-asm.js')
const path = require("path")
const dbPath = path.join(__static.replace('app.asar','app'),'db/sqlite.db')
export default {
  data () {
    return {
      savePath: '',
      upPath: '',
      files: [],
      userId: window.sessionStorage.getItem('userid'),
    }
  },
  created () {},
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
    back(){
      this.$router.go(-1)
    },
    getPath(){
      var that = this;
      ipcRenderer.send('open-directory-dialog', 'openDirectory');
      ipcRenderer.on('selectedItem', function (e, files) {
          if (files) {
              that.savePath = files
          }
      })
    },
    saveData(){
      if (this.savePath == '') return
      var data = this.$db.export()
      var buffer = new Buffer(data)
      fs.writeFileSync(this.savePath + '/sqlite.db', buffer)
      this.$message({ message: '导出成功！', center: true, offset: 300, type: 'success' })
    },
    changeFile(file, fileList) {
      if (fileList.length > 1) {
          fileList.splice(0, 1)
      }
      this.upPath = fileList[0].raw.path
    },
    upData(){
      if (this.upPath == '') return
      var filebuffer = fs.readFileSync(this.upPath)
      let that = this
      initSqlJs().then(function(SQL){
          var db = new SQL.Database(filebuffer)
          var data = db.export();
          var buffer = new Buffer(data);
          fs.writeFileSync(dbPath, buffer);
          that.$message({ message: '导入成功！', center: true, offset: 300, type: 'success' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.db-tool-page {
  height: 100%;
}
.el-empty {
  height: 100%;
}
// 使用CSS预处理器scoped让样式只在局部页面生效
</style>
  