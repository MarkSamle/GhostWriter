<template>
  <div class="files-page">
    <myHead class="head" style="width:calc(100% - 50px);" :style="{'background-color':chosecolor}" 
      @onChange="(val)=>{search=val}" @back="back" @onSearch="onSearch" @handle="onSearch"
      title="素材管理" :showButton="false"
    ></myHead>
    <!-- 高度占位 -->
    <div style="height:40px;"  v-if="filesList.length != 0"></div>

    <el-empty description="暂无数据，请重新查询" :image-size="200" v-if="filesList.length==0"></el-empty>
    <div style="padding:10px;" v-else>
      <el-table :data="filesList" border style="width: 100%" size="mini" height="calc( 100vh - 90px )">
        <el-table-column prop="id" label="ID" width="80" sortable header-align="center" align="center"></el-table-column>
        <el-table-column prop="path" label="文件路径"  header-align="center" align="center" min-width=“120” :show-overflow-tooltip='true'>
          <template slot-scope="scope" >
            <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" @click="toDownload(scope.row)" :title="scope.row.path">
              <span :style="{'color':chosecolor,'font-weight': '600'}" style="cursor:pointer;">{{scope.row.path}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180"  header-align="center" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="toDownload(scope.row)">下载</el-button>
            <el-button size="mini" type="danger" @click="delData(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import myHead from '@/components/page/head/index.vue'
import { mapGetters, mapMutations } from 'vuex'
const ipcRenderer = window.require('electron').ipcRenderer
const fs = window.require('fs')
const path = require("path")
import { getMonth,getNowStr } from '@/database/api/unit.js'
import { createFiles, getFiles, addFiles, delFiles, updateFiles, getFilesBySearch } from '@/database/api/files.js'
export default {
  name: 'files',
  components: { myHead },
  data () {
    return {
      userId: window.sessionStorage.getItem('userid'),
      search: '',
      filesList: [],
      savePath:''
    }
  },
  watch: {
    search(){
      this.onSearch()
    }
  },
  created () {
    this.getData()
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
    onSearch(){
      if (this.search == ''){
        this.filesList = getFiles(this.$db,this.userId)
      } else {
        this.filesList = getFilesBySearch(this.$db,this.userId,this.search)
      }
    },
    back(){
      this.$router.go(-1)
    },
    // 获取数据
    getData(){
      try {
        this.filesList = getFiles(this.$db,this.userId)
      } catch {
        createFiles(this.$db)
        this.filesList = getFiles(this.$db,this.userId)
      }
      // this.filesList = getFiles(this.$db,this.userId)
    },
    delData(index, row) {
      let that = this
      this.$confirm('删除后关联数据将无法找回，是否确认删除?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        // console.log(index, row);
        that.$db = delFiles(that.$db,row.id)
        this.$message({
          message: '删除文件成功！',
          center: true,
          offset: 300,
          type: 'success'
        })
        that.getData()
      })
    },
    toDownload(row){
      var that = this;
      ipcRenderer.send('open-directory-dialog', 'openDirectory');
      ipcRenderer.on('selectedItem', function (e, files) {
          if (files) {
            var imgDirPath = path.join(__static.replace('app.asar','app'),row.path)
            var buffer = fs.readFileSync(imgDirPath)
            fs.writeFileSync(files + row.path.substring(row.path.lastIndexOf("/")), buffer)
            that.$message({ message: '下载成功！', center: true, offset: 300, type: 'success' })
          }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.files-page {
  height: 100%;
}
.el-empty {
  height: 100%;
}
// 使用CSS预处理器scoped让样式只在局部页面生效
</style>
