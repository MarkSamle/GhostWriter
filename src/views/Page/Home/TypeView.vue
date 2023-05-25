<template>
  <div class="typ-page">
    <myHead class="head" style="width:calc(100% - 50px);" :style="{'background-color':chosecolor}" 
      @onChange="(val)=>{search=val}" @back="back" @onSearch="onSearchChange" @handle="handleIconClick" @open="opencreateDdialog"
      title="类别管理" button="新建类别"
    ></myHead>
    <!-- 高度占位 -->
    <div style="height:40px;"  v-if="typesList.length != 0"></div>

    <el-empty description="暂无数据，请重新查询、或点击右上角按钮新建类别" :image-size="200" v-if="typesList.length==0"></el-empty>
    <div style="padding:10px;" v-else>
      <el-table :data="typesList" border style="width: 100%" size="mini" height="calc( 100vh - 90px )">
        <el-table-column prop="id" label="ID" width="80" sortable header-align="center" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" width="180" sortable header-align="center" align="center"></el-table-column>
        <el-table-column prop="key" label="编码" width="180" sortable header-align="center" align="center"></el-table-column>
        <el-table-column prop="remark" label="说明"  header-align="center" align="center" min-width=“120” :show-overflow-tooltip='true'></el-table-column>
        <el-table-column label="操作" width="180"  header-align="center" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="openeditDdialog(scope.$index, scope.row)">编辑</el-button>
            <!-- :style="{'background-color':chosecolor, 'border-color': chosecolor, 'color': '#FFFFFF'}" -->
            <el-button size="mini" type="danger" @click="delData(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新建类别" :visible.sync="createDialogShow" width="400px">
      <el-form :model="createForm" :rules="createRules" ref="createFormRef">
        <el-form-item label="类别名称" label-width="80px" prop="name">
          <el-input v-model="createForm.name" placeholder="请输入类别名称"></el-input>
        </el-form-item>
        <el-form-item label="类别编码" label-width="80px" prop="key">
          <el-input v-model="createForm.key" placeholder="请输入英文字符编码"></el-input>
        </el-form-item>
        <el-form-item label="类别说明" label-width="80px" prop="remark">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入120字以内的类别说明" maxlength="120" show-word-limit v-model="createForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="createData">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑类别" :visible.sync="editDdialogShow" width="400px">
      <el-form :model="editForm" :rules="createRules" ref="editFormRef">
        <el-form-item label="类别名称" label-width="80px" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入类别名称"></el-input>
        </el-form-item>
        <el-form-item label="类别编码" label-width="80px" prop="key">
          <el-input v-model="editForm.key" placeholder="请输入英文字符编码"></el-input>
        </el-form-item>
        <el-form-item label="类别说明" label-width="80px" prop="remark">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入120字以内的类别说明" maxlength="120" show-word-limit v-model="editForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDdialogShow = false">取 消</el-button>
        <el-button type="primary" @click="editData">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import myHead from '@/components/page/head/index.vue'
import { mapGetters, mapMutations } from 'vuex'
import { createTypes, getTypes, addTypes, delTypes, updateTypes, getTypesBySearch } from '@/database/api/types.js'
export default {
  name: 'typeview',
  components: { myHead },
  data () {
    return {
      userId: window.sessionStorage.getItem('userid'),
      search: '',
      typesList: [],
      createDialogShow: false,
      editDdialogShow: false,
      createForm: {
        name: '',
        key: '',
        remark: '',
        userby: null,
      },
      editForm: {
        id: 0,
        name: '',
        key: '',
        remark: '',
        userby: null,
      },
      createRules: {
        name: [
          { required: true, message: '请输入类别名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        key: [
          { required: true, message: '请输入类别编码', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  watch: {
    search(){
      if (this.search == ''){
        this.typesList = getTypes(this.$db,this.userId)
      } else {
        this.typesList = getTypesBySearch(this.$db,this.userId,this.search)
      }
    }
  },
  created () {
    this.getData()
    // console.log(this.$router.history.current.meta['title'])
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
    // 返回
    back(){
      this.$router.go(-1)
    },
    // 搜索框图标触发
    handleIconClick(ev) {
      // console.log(this.search)
      if (this.search == ''){
        this.typesList = getTypes(this.$db,this.userId)
      } else {
        this.typesList = getTypesBySearch(this.$db,this.userId,this.search)
      }
    },
    // 搜索框回车触发
    onSearchChange(){
      // console.log(this.search)
      if (this.search == ''){
        this.typesList = getTypes(this.$db,this.userId)
      } else {
        this.typesList = getTypesBySearch(this.$db,this.userId,this.search)
      }
    },
    // 创建触发回调
    opencreateDdialog(){
      this.createDialogShow = true
    },
    createData(){
      this.$refs.createFormRef.validate(async valid => {
        if (!valid) return
        this.createForm.userby = this.userId
        // console.log(this.createForm,this.userId)
        this.$db = addTypes(this.$db,this.createForm)
        this.$message({
          message: '新建类别成功！',
          center: true,
          offset: 300,
          type: 'success'
        })
        this.createForm.name = ''
        this.createForm.key = ''
        this.createForm.remark = ''
        this.createDialogShow = false
        this.getData()
      })
    },
    openeditDdialog(index, row) {
      // console.log(index, row);
      this.editForm.id = row.id
      this.editForm.name = row.name
      this.editForm.key = row.key
      this.editForm.remark = row.remark
      this.editForm.userby = row.userby
      this.editDdialogShow = true
    },
    editData(){
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        this.editForm.userby = this.userId
        // console.log(this.editForm,this.userId)
        this.$db = updateTypes(this.$db,this.editForm)
        this.$message({
          message: '修改类别成功！',
          center: true,
          offset: 300,
          type: 'success'
        })
        this.editForm.id = 0
        this.editForm.name = ''
        this.editForm.key = ''
        this.editForm.remark = ''
        this.editDdialogShow = false
        this.getData()
      })
    },
    delData(index, row) {
      let that = this
      this.$confirm('删除后关联数据将无法找回，是否确认删除?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        // console.log(index, row);
        that.$db = delTypes(that.$db,row.id)
        this.$message({
          message: '删除类别成功！',
          center: true,
          offset: 300,
          type: 'success'
        })
        that.getData()
      })
    },
    // 获取数据
    getData(){
      try {
        this.typesList = getTypes(this.$db,this.userId)
      } catch {
        createTypes(this.$db)
        this.typesList = getTypes(this.$db,this.userId)
      }
      // this.typesList = getTypes(this.$db,this.userId)
    }
  }
}
</script>

<style lang="scss" scoped>
.typ-page {
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
</style>
