<template>
  <div class="collect-page">
    <myHead class="head" style="width:calc(100% - 50px);" :style="{'background-color':chosecolor}" 
      @onChange="(val)=>{search=val}" @back="back" @onSearch="onSearchChange" @handle="handleIconClick" @open="opencreateDdialog"
      title="文集管理" button="新建文集"
    ></myHead>
    <!-- 高度占位 -->
    <div style="height:40px;" v-if="collectList.length != 0"></div>

    <el-empty description="暂无数据，请重新查询、或点击右上角按钮新建文集" :image-size="200" v-if="collectList.length==0"></el-empty>
    <div style="padding:10px;" v-else>
      <el-table :data="collectList" border style="width: 100%" size="mini" height="calc( 100vh - 90px )">
        <el-table-column prop="id" label="ID" width="80" sortable header-align="center" align="center"></el-table-column>
        <el-table-column prop="icon" label="图标" width="80" sortable header-align="center" align="center">
          <template slot-scope="scope">
            <i :class="scope.row.icon" style="font-size:20px;"></i>
          </template>
        </el-table-column>
        <el-table-column prop="typ" label="类别" width="100" sortable header-align="center" align="center">
          <template slot-scope="scope">{{typeChoices.hasOwnProperty(scope.row.typ)?typeChoices[scope.row.typ]:scope.row.typ}}</template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="180" sortable header-align="center" align="center" min-width=“180” :show-overflow-tooltip='true'>
          <template slot-scope="scope">
            <!-- <el-button type="text" :style="{'color':chosecolor,'font-weight': '600'}" @click="toCollect(scope.row)">{{scope.row.name}}</el-button> -->
            <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" @click="toCollect(scope.row)" :title="scope.row.name">
              <span :style="{'color':chosecolor,'font-weight': '600'}" style="cursor:pointer;">{{scope.row.name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="说明"  header-align="center" align="center" min-width=“180” :show-overflow-tooltip='true'></el-table-column>
        <el-table-column prop="update_date" label="更新时间" width="160" header-align="center" align="center"></el-table-column>
        <el-table-column label="操作" width="180"  header-align="center" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="openeditDdialog(scope.$index, scope.row)">编辑</el-button>
            <!-- :style="{'background-color':chosecolor, 'border-color': chosecolor, 'color': '#FFFFFF'}" -->
            <el-button size="mini" type="danger" @click="delData(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新建文集" :visible.sync="createDialogShow" width="400px">
      <el-dialog
        width="280px"
        title="选择图标"
        :visible.sync="createDdialogIconShow"
        append-to-body>
        <div style="overflow-y: auto;height:380px;padding-right:10px;" class="icon-list">
          <el-row :gutter="10" style="height:30px;">
            <el-col :span="6" style="height:100%;margin-bottom: 10px;" v-for="(icon,index) in iconOption" :key="index" >
              <div style="width:100%;height:100%;display: flex;align-items: center;justify-content: center;border: 0.2px solid;font-size:20px;cursor:pointer;"
                @click="createDdialogIconShow = false;createForm.icon = icon.name;">
                <el-button type="text"  :style="{'color':chosecolor}"><i :class="icon.name"></i></el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-dialog>

      <el-form :model="createForm" :rules="createRules" ref="createFormRef">
        <el-form-item label="文集图标" label-width="80px" prop="icon">
          <el-button :icon="createForm.icon != ''?createForm.icon:'el-icon-plus'" @click="createDdialogIconShow = true" style="font-size:20px;" size="mini"></el-button>
          <!-- <el-input v-model="createForm.icon" placeholder="请输入英文字符图标"></el-input> -->
        </el-form-item>
        <el-form-item label="文集名称" label-width="80px" prop="name">
          <el-input v-model="createForm.name" placeholder="请输入文集名称"></el-input>
        </el-form-item>
        <el-form-item label="文集类别" label-width="80px" prop="typ">
          <el-select v-model="createForm.typ" clearable filterable placeholder="请选择文集类别" style="width:100%;">
            <el-option
              v-for="item in typeOption"
              :key="item.key"
              :label="item.name"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文集说明" label-width="80px" prop="remark">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入120字以内的文集说明" maxlength="120" show-word-limit v-model="createForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="createData">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑文集" :visible.sync="editDdialogShow" width="400px">
      <el-dialog
        width="240px"
        title="选择图标"
        :visible.sync="editDdialogIconShow"
        append-to-body>
        <div style="overflow-y: auto;height:380px;padding-right:10px;" class="icon-list">
          <el-row :gutter="10" style="height:30px;">
            <el-col :span="6" style="height:100%;margin-bottom: 10px;" v-for="(icon,index) in iconOption" :key="index" >
              <div style="width:100%;height:100%;display: flex;align-items: center;justify-content: center;border: 0.2px solid;font-size:20px;cursor:pointer;"
                @click="editDdialogIconShow = false;editForm.icon = icon.name;">
                <el-button type="text"  :style="{'color':chosecolor}"><i :class="icon.name"></i></el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-dialog>

      <el-form :model="editForm" :rules="createRules" ref="editFormRef">
        <el-form-item label="文集图标" label-width="80px" prop="icon">
          <el-button :icon="editForm.icon != ''?editForm.icon:'el-icon-plus'" @click="editDdialogIconShow = true" style="font-size:20px;" size="mini"></el-button>
          <!-- <el-input v-model="editForm.icon" placeholder="请输入英文字符图标"></el-input> -->
        </el-form-item>
        <el-form-item label="文集名称" label-width="80px" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入文集名称"></el-input>
        </el-form-item>
        <el-form-item label="文集类别" label-width="80px" prop="typ">
          <el-select v-model="editForm.typ" clearable filterable placeholder="请选择文集类别" style="width:100%;">
            <el-option
              v-for="item in typeOption"
              :key="item.key"
              :label="item.name"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文集说明" label-width="80px" prop="remark">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入120字以内的文集说明" maxlength="120" show-word-limit v-model="editForm.remark"></el-input>
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
import { getIcons } from '@/database/api/icon.js'
import { createTypes,getTypes } from '@/database/api/types.js'
import { createDoc } from '@/database/api/doc.js'
import { createCollect, getCollect, addCollect, delCollect, updateCollect, getCollectBySearch } from '@/database/api/collect.js'
export default {
  name: 'collect',
  components: { myHead },
  data () {
    return {
      userId: window.sessionStorage.getItem('userid'),
      iconOption: [],
      typeOption: [],
      typeChoices: {},
      search: '',
      collectList: [],
      createDialogShow: false,
      createDdialogIconShow: false,
      editDdialogShow: false,
      editDdialogIconShow: false,
      createForm: {
        name: '',
        icon: '',
        remark: '',
        typ:'',
        userby: null,
      },
      editForm: {
        id: 0,
        name: '',
        icon: '',
        remark: '',
        typ:'',
        level: 0,
        userby: null,
      },
      createRules: {
        name: [
          { required: true, message: '请输入文集名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入文集图标', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  watch: {
    search(){
        if (this.search == ''){
            this.collectList = getCollect(this.$db,this.userId)
        } else {
            this.collectList = getCollectBySearch(this.$db,this.userId,this.search)
        }
    }
  },
  created () {
    this.getData()
    this.getTypeList()
    this.getIcons()
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
    collectId: {
      get () {
        return this.$store.state.collectData.collectId
      },
      set (value) {
        this.setCollectId(value)
      }
    },
    ...mapGetters('storeData', [ 'storeDataFrom' ]),
    ...mapGetters('collectData', ['collectDataFrom'])
  },
  methods: {
    ...mapMutations('storeData', ['setColor', ]),
    ...mapMutations('collectData', ['setCollectId', ]),
    // 点击名称触发回调
    toCollect(row){
      this.collectId = row.id
      this.$router.push('/collectview')
    },
    // 返回
    back(){
        this.$router.go(-1)
    },
    // 获取图标数据
    getIcons(){
      this.iconOption = getIcons(this.$db)
      // console.log('图标',this.iconOption)
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
    // 搜索框图标触发
    handleIconClick(ev) {
        // console.log(this.search)
        if (this.search == ''){
            this.collectList = getCollect(this.$db,this.userId)
        } else {
            this.collectList = getCollectBySearch(this.$db,this.userId,this.search)
        }
    },
    // 搜索框回车触发
    onSearchChange(){
        // console.log(this.search)
        if (this.search == ''){
            this.collectList = getCollect(this.$db,this.userId)
        } else {
            this.collectList = getCollectBySearch(this.$db,this.userId,this.search)
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
            this.$db = addCollect(this.$db,this.createForm)
            this.$message({
                message: '新建文集成功！',
                center: true,
                offset: 300,
                type: 'success'
            })
            this.createForm.name = ''
            this.createForm.icon = ''
            this.createForm.typ = ''
            this.createForm.remark = ''
            this.createDialogShow = false
            this.getData()
        })
    },
    openeditDdialog(index, row) {
        // console.log(index, row);
        this.editForm.id = row.id
        this.editForm.name = row.name
        this.editForm.icon = row.icon
        this.editForm.remark = row.remark
        this.editForm.typ = row.typ
        this.editForm.level = row.level
        this.editForm.userby = row.userby
        this.editDdialogShow = true
    },
    editData(){
        this.$refs.editFormRef.validate(async valid => {
            if (!valid) return
            this.editForm.userby = this.userId
            // console.log(this.editForm,this.userId)
            this.$db = updateCollect(this.$db,this.editForm)
            this.$message({
                message: '修改文集成功！',
                center: true,
                offset: 300,
                type: 'success'
            })
            this.editForm.id = 0
            this.editForm.name = ''
            this.editForm.icon = ''
            this.editForm.remark = ''
            this.editForm.typ = ''
            this.editForm.level = 0
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
            that.$db = delCollect(that.$db,row.id)
            this.$message({
                message: '删除文集成功！',
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
        this.collectList = getCollect(this.$db,this.userId)
      } catch {
        createCollect(this.$db)
        createDoc(this.$db)
        this.collectList = getCollect(this.$db,this.userId)
      }
      // this.collectList = getCollect(this.$db,this.userId)
    }
  }
}
</script>

<style lang="scss" scoped>
.collect-page {
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
.icon-list::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.icon-list::-webkit-scrollbar-track {
  background-color:#F5F5F5;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
.icon-list::-webkit-scrollbar-thumb {
  background-color:#565252;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
</style>
