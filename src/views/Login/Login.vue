<template>
  <div class="login-page">

    <!-- 登录框 -->
    <div class="login-box">

      <!-- 头像区 -->
      <!-- <div class="avatar-box">
        <img src="../../assets/logo.png" />
      </div> -->

      <!-- 登录表单区 -->
      <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <el-form-item style="text-align: center;">
          <span style="font-size:20px;">Ghost Writer</span>
        </el-form-item>
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
        <el-form-item class="btns">
          <el-button type="danger" @click="retrieve" size="mini" plain>修改密码</el-button>
          <el-button type="danger" @click="deleteUser" size="mini" plain>注销</el-button>
          <el-button type="info" @click="register" size="mini" plain>注册</el-button>
          <el-button type="primary" @click="login" size="mini">登录</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import { userLogin, delUser } from '@/database/api/user.js'
import { mapGetters, mapMutations } from 'vuex'
// import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        username: window.sessionStorage.getItem('username'),
        password: window.sessionStorage.getItem('password')
      },
      // 登录表单验证规则
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
    // SQLiteInit
    this.tryLogin()
  },
  methods: {
    ...mapMutations('userData', ['setUser', ]),
    // 缓存用户数据
    setUserForm(thisUser){
      window.sessionStorage.setItem('userid', thisUser.id)
      window.sessionStorage.setItem('username', this.loginForm.username)
      window.sessionStorage.setItem('password', this.loginForm.password)
      const newUser = {id: thisUser.id, username: this.loginForm.username, password: this.loginForm.password}
      this.userData = newUser
    },
    justLogin(thisUser){
      this.setUserForm(thisUser)
      this.$router.push('/home')
      const news = {
        title: '登录',
        body: '登陆成功',
        silent: false, // false有声音，true没声音
        icon: '../../assets/logo.png',
        timeoutType: 'default' // 通知的超时持续时间 'default' or 'never'
      }
      this.$notice(news)
    },
    // 自动登录
    tryLogin(){
      this.loginForm.username = this.userData.username
      this.loginForm.password = this.userData.password
      // 从状态管理获取信息验证登录
      const thisUser = userLogin(this.$db,this.loginForm)
      if (thisUser.id){
        // this.justLogin(thisUser)
        this.setUserForm(thisUser)
        this.$router.push('/home')
      }
    },

    // 点击重置按钮，重置登录表单
    resetLoginForm () { this.$refs.loginFormRef.resetFields() },
    // 注册
    register(){ this.$router.push('/register') },
    // 找回
    retrieve(){
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const thisUser = userLogin(this.$db,this.loginForm)
        if (thisUser.id){
          thisUser.password = this.loginForm.password
          this.setUserForm(thisUser)
          // this.$router.push('/retrieve')
          this.$router.push({ path: '/retrieve', query: { user: thisUser }})
        } else {
          this.$message({ message: '账号或密码错误！', center: true, offset: 300, type: 'error' })
        }
      })
    },
    // 注销账号
    deleteUser(){
      let that = this
      that.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const thisUser = userLogin(this.$db,this.loginForm)
        if (thisUser.id){
          this.$confirm('注销后数据将无法找回，是否确认注销账号?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            delUser(that.$db,thisUser.id)
            that.loginForm.username = ''
            that.loginForm.password = ''
            window.sessionStorage.setItem('userid', 0)
            window.sessionStorage.setItem('username', '')
            window.sessionStorage.setItem('password', '')
            this.userData = {}
            const news = {
              title: '注销',
              body: '账号已注销',
              silent: false, // false有声音，true没声音
              icon: '../../assets/logo.png',
              timeoutType: 'default' // 通知的超时持续时间 'default' or 'never'
            }
            that.$notice(news)
          })
        } else {
          this.$message({ message: '账号或密码错误！', center: true, offset: 300, type: 'error' })
        }
      })
    },
    // 登录
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const thisUser = userLogin(this.$db,this.loginForm)
        // console.log(thisUser)
        if (thisUser.id){ this.justLogin(thisUser) } else {
          this.$message({ message: '账号或密码错误！', center: true, offset: 300, type: 'error' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.login-page {
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

.login-box {
  -webkit-app-region: drag;
  width: 450px;
  height: 280px;
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

.login-form {
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
