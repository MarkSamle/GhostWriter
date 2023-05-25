<template>
  <div class="retrieve-page">
    <!-- 修改密码框 -->
    <div class="retrieve-box">
      <!-- 修改密码表单区 -->
      <el-form class="retrieve-form" ref="retrieveFormRef" :model="retrieveForm" :rules="retrieveFormRules">
        <el-form-item style="text-align: center;">
          <span style="font-size:20px;">Ghost Writer Retrieve</span>
        </el-form-item>
        <!-- 名称 -->
        <el-form-item prop="name">
          <el-input
            v-model="retrieveForm.name"
            placeholder="名称"
            prefix-icon="el-icon-user"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="retrieveForm.username"
            placeholder="用户名"
            prefix-icon="el-icon-postcard"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <!-- 旧密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="retrieveForm.oldpassword"
            placeholder="旧密码"
            prefix-icon="el-icon-lock"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 新密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="retrieveForm.password"
            placeholder="新密码"
            prefix-icon="el-icon-lock"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="info" @click="back" size="mini">返回</el-button>
          <el-button type="primary" @click="retrieve" size="mini">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
<script>
import { updateUser } from '@/database/api/user.js'
import { mapGetters, mapMutations } from 'vuex'
// import axios from 'axios'
export default {
  data () {
    return {
      retrieveForm: {
        id:'',
        username: '',
        oldPassword: '',
        password: '',
        name: '',
        remark: '',
        is_super: 0,
      },
      // 修改密码表单验证规则
      retrieveFormRules: {
        name: [
          {
            required: true,
            message: '请输入名称！',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符！',
            trigger: 'blur'
          }
        ],
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
  computed: {
    userData: {
      get () {
        return this.$store.state.userData
      },
      set (value) {
        this.setUser(value)
      }
    },
    ...mapGetters('userData', [ 'userDataFrom' ])
  },
  created(){
    this.getUser()
  },
  mounted(){},
  methods: {
    ...mapMutations('userData', ['setUser', ]),
    getUser(){
        this.retrieveForm.id = this.$route.query.user.id
        this.retrieveForm.username = this.$route.query.user.username
        this.retrieveForm.oldpassword = this.$route.query.user.password
        this.retrieveForm.name = this.$route.query.user.name
        this.retrieveForm.remark = this.$route.query.user.remark
        this.retrieveForm.is_super = this.$route.query.user.is_super
    },
    // 点击重置按钮，重置修改密码表单
    resetretrieveForm () {
        this.$refs.retrieveFormRef.resetFields()
    },
    back(){
        this.$router.push('/login')
    },
      // 修改密码
      retrieve () {
          this.$refs.retrieveFormRef.validate(async valid => {
          if (!valid) return
          this.userData = this.retrieveForm
          window.sessionStorage.setItem('username', this.retrieveForm.username)
          window.sessionStorage.setItem('password', this.retrieveForm.password)
          this.$db = updateUser(this.$db,this.retrieveForm)
          this.$router.push('/login')
          const news = {
              title: '修改密码',
              body: '修改密码成功，请登录！',
              silent: false, // false有声音，true没声音
              icon: '../../assets/logo.png',
              timeoutType: 'default' // 通知的超时持续时间 'default' or 'never'
          }
          this.$notice(news)
          })
      }
  }
}
</script>

<style lang="scss" scoped>

.retrieve-page {
  -webkit-app-region: drag;
  background-color: #00000000;
  height: 100%;
  // 以下两行是将图片铺满整个屏幕
  // background: url(../../assets/background.png);
  background-size: cover;
  background-position: center;
  -webkit-font-smoothing: antialiased; // 这个属性可以使页面上的字体抗锯齿,使用后字体看起来会更清晰舒服
  font-weight: 300;
}

.retrieve-box {
  -webkit-app-region: drag;
  width: 450px;
  height: 420px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border:2px solid rgb(252, 251, 251);
  box-shadow: darkgrey 10px 10px 30px 5px ;

  .avatar-box {
    height: 130px;
    width: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: relative;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }
}

.retrieve-form {
  -webkit-app-region: no-drag;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  font-size: 10px !important;
  display: flex;
  justify-content: flex-end;
}
</style>
