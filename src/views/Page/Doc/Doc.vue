<template>
  <div class="doc-page">
    <myHead class="head" style="width:calc(100% - 50px);" :style="{'background-color':chosecolor}" 
      @onChange="(val)=>{search=val}" @back="back" @onSearch="onSearch" @handle="onSearch" @open="createDocDialogShow = true"
      title="文档管理" button="新建文档"
    ></myHead>
    <!-- 高度占位 -->
    <div style="height:40px;" v-if="docList.length != 0"></div>
    <el-empty description="暂无数据，请重新查询、或点击右上角按钮新建文档" :image-size="200" v-if="docList.length==0"></el-empty>
    <div style="padding:10px;" v-else>

      <el-table :data="docList" border style="width: 100%" size="mini" height="calc( 100vh - 90px )">
        <el-table-column prop="id" label="ID" width="80" sortable header-align="center" align="center"></el-table-column>

        <el-table-column prop="collect_data.typ" label="文集类别" width="100" sortable header-align="center" align="center">
          <template slot-scope="scope">
            {{typeChoices[scope.row.collect_data.typ]}}
          </template>
        </el-table-column>
        <el-table-column prop="collect_data.name" label="所属文集" width="150" sortable header-align="center" align="center">
          <template slot-scope="scope">
            <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" @click="toCollect(scope.row.collect_data)" :title="scope.row.collect_data.name">
              <span :style="{'color':chosecolor,'font-weight': '600'}" style="cursor:pointer;">{{scope.row.collect_data.name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="180" sortable header-align="center" align="center" min-width=“180” :show-overflow-tooltip='true'>
          <template slot-scope="scope" >
            <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" @click="toDoc(scope.row)" :title="scope.row.name">
              <span :style="{'color':chosecolor,'font-weight': '600'}" style="cursor:pointer;">{{scope.row.name}}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="remark" label="说明"  header-align="center" align="center" min-width=“180” :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="update_date" label="更新时间" width="160" header-align="center" align="center"></el-table-column>

        <el-table-column label="操作" width="150"  header-align="center" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="toEditDoc(scope.row)">编辑</el-button>
            <!-- :style="{'background-color':chosecolor, 'border-color': chosecolor, 'color': '#FFFFFF'}" -->
            <el-button size="mini" type="danger" @click="delData(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
import myHead from '@/components/page/head/index.vue'
import { createTypes,getTypes } from '@/database/api/types.js'
import { createDoc, getDoc,getDocBySearch,delDoc } from '@/database/api/doc.js'
import { createCollect, getCollect, getOrderCollect } from '@/database/api/collect.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'doc',
  components: { myHead },
  data () {
    return {
      userId: window.sessionStorage.getItem('userid'),
      search: '',
      docList: [],
      collectList: [],
      typeOption: [],
      typeChoices: {},
      createDocDialogShow: false,
      editorList: [
        {
          name: 'Mavon MarkDown',
          value: 'MarkDown'
        },
        {
          name: 'Diagrams Editor',
          value: 'DiagramsEditor'
        }
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
  created () {
    this.getData()
    this.getTypeList()
    this.getCollectList()
  },
  watch: {
    search(){
      this.onSearch()
    }
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
    // 返回
    back(){
        this.$router.go(-1)
    },
    // 获取数据
    getData(){
      try {
        this.docList = getDoc(this.$db,this.userId)
      } catch {
        createCollect(this.$db)
        createDoc(this.$db)
        this.docList = getDoc(this.$db,this.userId)
      }
    },
    // 获取文集数据
    getCollectList(){
      try {
        this.collectList = getCollect(this.$db,this.userId)
      } catch {
        createCollect(this.$db)
        createDoc(this.$db)
        this.collectList = getCollect(this.$db,this.userId)
      }
    },
    // 获取类别数据
    getTypeList(){
      var def = [
        {
          id: 1,
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
    delData(index, row) {
        let that = this
        this.$confirm('删除后关联数据将无法找回，是否确认删除?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            // console.log(index, row);
            that.$db = delDoc(that.$db,row.id)
            this.$message({
                message: '删除文档成功！',
                center: true,
                offset: 300,
                type: 'success'
            })
            that.getData()
          })
    },
    // 搜索框回车触发
    onSearch(){
      if (this.search == ''){
        this.docList = getDoc(this.$db,this.userId)
      } else {
        this.docList = getDocBySearch(this.$db,this.userId,this.search)
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
    toCollect(collect){
      this.collectId = collect.id
      this.$router.push('/collectview')
    },
    toDoc(doc){
      this.docData = doc
      if (this.docData.editor == 'MarkDown') {
          this.$router.push('/mdview')
      } else if (this.docData.editor == 'DiagramsEditor') {
          this.$router.push('/mindview')
      }
    },
    toEditDoc(doc){
      this.docData = doc
      this.$router.push({
        path: '/mdeditor',
        query: {
          type: 'edit'
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.doc-page {
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
// 使用CSS预处理器scoped让样式只在局部页面生效
</style>
