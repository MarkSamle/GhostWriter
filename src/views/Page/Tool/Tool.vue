<template>
  <div class="tool-page">
    <div style="padding:15px;width:60px;text-align: center;float:left;">
      <div><el-button type="text" @click="showDbPre()" size="mini" style="font-size:50px;color:#525252;"><i class="el-icon-coin" style="font-size:50px;"></i></el-button></div>
      <div>数据库工具</div>
    </div>

    <ocrShowView ocrType="div" style="float:left;"></ocrShowView>

    <el-dialog title="管理员权限验证" :visible.sync="showDbDialog" width="400px" :before-close="handleClose">
      <div style="text-align: center;"><span style="color:red;font-size:15px;">数据库工具是敏感功能，需要验证管理员权限</span></div>

      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" style="margin-top:15px;">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="toDbTool">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { userLogin } from '@/database/api/user.js'
import ocrShowView from '@/components/page/ocr/index.vue'
export default {
  components: { ocrShowView },
  data () {
    return {
      userId: window.sessionStorage.getItem('userid'),
      showDbDialog: false,
      loginForm: {
        username:'',
        password: ''
      },
      loginFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名！',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符！',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码！',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符！',
            trigger: 'blur'
          }
        ]
      }
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
    showDbPre(){
      this.showDbDialog = true
    },
    toDbTool(){
      const thisUser = userLogin(this.$db,this.loginForm)
      if (thisUser.id && thisUser.is_super == 1){
        this.$router.push('/dbtool')
      } else {
        this.handleClose()
        this.$message({ message: '警告！没有操作权限！', center: true, offset: 300, type: 'error' })
      }

    },
    handleClose(done) {
      this.showDbDialog = false
      this.loginForm.username = ''
      this.loginForm.password = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.tool-page {
  height: 100%;
}
.el-empty {
  height: 100%;
}
/deep/ .el-dialog__body {
  padding: 0 10px !important;
  margin: 0 !important;
}
/deep/ .el-form-item {
  margin-top: 10px !important;
  margin-bottom: 0 !important;
}
// 使用CSS预处理器scoped让样式只在局部页面生效
</style>
