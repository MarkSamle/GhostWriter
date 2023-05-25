<template>
  <div class="home-page">
    <!-- 头部 -->
    <div class="head" style="width:100%;" :style="{'background-color':chosecolor}">
      <!-- 行元素 -->
      <el-row class="head-box" style="height:100%;">
        <!-- 左侧输入框 -->
        <el-col :span="16" style="height:100%;">
          <div style="margin-left:50%;width:40%;height:100%;display: flex;align-items: center;">
            <el-input size="mini" v-model="search" clearable @change="onSearch">
              <i class="el-icon-search el-input__icon" slot="suffix" @click="onSearch" style="cursor:pointer;" ></i>
            </el-input>
          </div>
        </el-col>
        <!-- 右侧功能按钮组 -->
        <el-col :span="4" style="height:100%;">
          <div style="display: flex;align-items: center;height:100%;justify-content: flex-end;">
            <el-dropdown style="cursor:pointer;color:#FFFFFF;" @command="createdCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-circle-plus el-icon--left"></i>新建
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-s-flag" command="/types">新建类别</el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-management" command="/collect">新建文集</el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-order" command="/doc">新建文档</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </div>

    <!-- 高度占位 -->
    <div style="height:40px;"></div>
    <!-- 筛选条 -->
    <div style="display: flex;align-items: center;justify-content: flex-end;height:30px;">
      <!-- 类别筛选 -->
      <el-dropdown trigger="click" style="margin:10px 30px 10px 0px;cursor:pointer;"  @command="typeChoicesCommand">
        <span class="el-dropdown-link">
          {{typeChoices[typ]}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(typ,index) in typeOption" :key="index" :command="typ.key">{{typ.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 时间排序 -->
      <el-dropdown trigger="click" style="margin:10px 30px 10px 0px;;cursor:pointer;"  @command="timeOrderCommand">
        <span class="el-dropdown-link">
          {{timeOrderChoices[timeOrder]}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-refresh" command="">时间排序</el-dropdown-item>
          <el-dropdown-item icon="el-icon-top" command="asc">时间升序</el-dropdown-item>
          <el-dropdown-item icon="el-icon-bottom" command="desc">时间降序</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="collect-card-list" style="width: inherit;height:calc( 100vh - 105px );overflow-y: auto;display: flex;justify-content: center;">
      <div style="margin:10px 20px;width: 100%;max-width:1400px;min-width:900px;">
        <el-empty description="暂无数据" :image-size="200" v-if="collectList.length == 0"></el-empty>
        <el-row :gutter="20" style="padding-bottom:10px;width:100%;" v-else>
          <el-col :span="6" style="height:100%;max-width:400px;margin-bottom: 10px;" v-for="(item,index) in collectList" :key="index" >
            <el-card shadow="hover" style="height:160px;" :body-style="{ padding: '0.3vw' }" body->
              <div class="card-title" :style="{'color':chosecolor}" :title="item.name"  @click="seeCollect(item)"><i :class="item.icon"></i> <span>{{item.name}}</span></div>
              <div class="card-remark" :title="item.remark" @click="seeCollect(item)"><i class="el-icon-bell" ></i> <span>{{item.remark}}</span></div>
              <div v-for=" (doc,num) in item.doc.list" :key="num" class="doc-name" :title="doc.name" @click="seeDoc(doc)">
                <i class="el-icon-document"></i> <span>{{doc.name}}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- <el-divider :style="{'background-color':chosecolor}"></el-divider> -->
        <div style="height:5px;"></div>
      </div>
      
    </div>

    <!-- 新建文档信息预填 -->
    <el-dialog title="新建文档" :visible.sync="createDocDialogShow" width="400px">
      <el-form :model="createDocForm" :rules="createDocRules" ref="createDocFormRef">
        <el-form-item label="文档名称" label-width="80px" prop="name">
          <el-input v-model="createDocForm.name" placeholder="请输入文档名称"></el-input>
        </el-form-item>
        <el-form-item label="所属文集" label-width="80px" prop="collect">
          <el-select v-model="createDocForm.collect" filterable clearable placeholder="请选择所属文集" style="width:100%;">
            <el-option
              v-for="item in collectList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="使用编辑" label-width="80px" prop="editor">
          <el-select v-model="createDocForm.editor" filterable clearable placeholder="请选择使用编辑器" style="width:100%;">
            <el-option
              v-for="item in editorList"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="文档说明" label-width="80px" prop="remark">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入120字以内的文档说明" maxlength="120" show-word-limit v-model="createDocForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createDocDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="toDocPage">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { createTypes,getTypes } from '@/database/api/types.js'
import { createDoc } from '@/database/api/doc.js'
import { createCollect, getCollect, getOrderCollect } from '@/database/api/collect.js'
export default {
  data () {
    return {
      userId: window.sessionStorage.getItem('userid'),
      search: '',
      timeOrder: '',
      timeOrderChoices: {'':'时间排序','asc':'时间升序','desc':'时间降序'},
      typ: '',
      typeChoices: {},
      typeOption: [],
      collectList: [],
      createDocDialogShow: false,
      editorList: [
        {
          name: 'Mavon MarkDown',
          value: 'MarkDown'
        },
        {
          name: 'Diagrams Editor',
          value: 'DiagramsEditor'
        },
      ],
      createDocForm: {
        id: '',
        tier: 1,
        name: '',
        collect: null,
        remark: '',
        editor: 'MarkDown'
      },
      createDocRules: {
        name: [
          { required: true, message: '请输入文档名称', trigger: 'blur' },
          { max: 50, message: '50 个字符以内', trigger: 'blur' }
        ],
        collect: [
          { required: true, message: '请选择所属文集', trigger: 'blur' },
        ],
        editor: [
          { required: true, message: '请选择使用编辑器', trigger: 'blur' },
        ],
      }
    }
  },
  watch: {
    // timeOrder(){
    //   console.log(this.timeOrder)
    //   this.timeOrderShow = false
    //   this.$nextTick(() => {
    //     this.timeOrderShow = true
    //   })
    // }
  },
  created () {
    this.getTypeList()
    this.getCollectList()
    this.docData = {} // 确保不留异常值
    this.collectId = 0
    // console.log('docData初始值',this.docData)
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
    collectId: {
      get () {
        return this.$store.state.collectData.collectId
      },
      set (value) {
        this.setCollectId(value)
      }
    },
    docData: {
      get () {
        return this.$store.state.docData
      },
      set (value) {
        this.setDoc(value)
      }
    },
    ...mapGetters('storeData', ['storeDataFrom']),
    ...mapGetters('docData', ['docDataFrom']),
    ...mapGetters('collectData', ['collectDataFrom'])
  },
  methods: {
    ...mapMutations('storeData', ['setColor', ]),
    ...mapMutations('docData', ['setDoc', ]),
    ...mapMutations('collectData', ['setCollectId', ]),
    // 搜索框触发
    onSearch(){
      // console.log(this.search)
      this.$router.push({ path: '/search', query: { search: this.search }})
    },
    // 时间排序触发回调
    timeOrderCommand(command) {
      this.timeOrder = command
      // console.log(this.timeOrder)
      this.getCollectList()
    },
    // 类别筛选触发回调
    typeChoicesCommand(command) {
      this.typ = command
      // console.log(this.typ)
      this.getCollectList()
    },
    // 选择创建回调
    createdCommand(command) {
      if (command == '/doc') {
        this.createDocDialogShow = true
      } else {
        this.$router.push(command)
      }
    },
    // 获取类别数据
    getTypeList(){
      var def = [
        {
          id: 0,
          name: '筛选',
          key: ''
        },
      ]
      try {
        this.typeOption = def.concat(getTypes(this.$db,this.userId))
      } catch {
        createTypes(this.$db)
        this.typeOption = def.concat(getTypes(this.$db,this.userId))
      }
      // this.typeOption = def.concat(getTypes(this.$db,this.userId))
      var typObjs = {}
      this.typeOption.map(function (e, item) {
        typObjs[e.key] = e.name;
      })
      this.typeChoices = typObjs
    },
    // 获取文集数据
    getCollectList(){
      try {
        var param = {userby:this.userId, typ:this.typ, order:this.timeOrder}
        this.collectList = getOrderCollect(this.$db,param)
      } catch {
        createCollect(this.$db)
        createDoc(this.$db)
        var param = {userby:this.userId, typ:this.typ, order:this.timeOrder}
        this.collectList = getOrderCollect(this.$db,param)
      }
    },
    // 前往编辑页面-创建
    toDocPage(){
      this.$refs.createDocFormRef.validate(async valid => {
        if (!valid) return
        // 使用MarkDown编辑器
        if (this.createDocForm.editor == 'MarkDown') {
          this.docData = this.createDocForm
          this.$router.push('/mdeditor')
        } else if (this.createDocForm.editor == 'DiagramsEditor') {
          this.docData = this.createDocForm
          this.$router.push('/mindeditor')
        }
      })
    },
    // 前往文档查看页面->修改
    seeDoc(doc){
      this.docData = doc
      if (this.docData.editor == 'MarkDown') {
          this.$router.push('/mdview')
      } else if (this.docData.editor == 'DiagramsEditor') {
          this.$router.push('/mindview')
      }
    },
    // 前往文集查看页面
    seeCollect(collect){
      this.collectId = collect.id
      this.$router.push('/collectview')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  height: 100%;
}
.el-empty {
  height: 100%;
}
.head {
  width: 100%;
  height: 40px;
  border-bottom: 2px solid #e9e9e9e0;
  position: fixed;
  top: 30px;
  // top: 30;
}
//.head-box {
//  float: right;
//  width: 100%;
// }
.collect-card-list::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.collect-card-list::-webkit-scrollbar-track {
  background-color:#F5F5F5;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
.collect-card-list::-webkit-scrollbar-thumb {
  background-color:#565252;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
.card-title {
  padding:5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor:pointer;
  border-bottom: 1px solid #c0ccda;
  font-size:15px;
  font-weight:600;
}
.card-remark {
  padding:5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size:13px;
  cursor:pointer;
}
.doc-name {
  padding:5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor:pointer;
  font-size:12px;
}
</style>
