<template>
  <div class="register-page">

    <!-- 注册框 -->
    <div class="register-box">

      <!-- 注册表单区 -->
      <el-form class="register-form" ref="registerFormRef" :model="registerForm" :rules="registerFormRules">
        <el-form-item style="text-align: center;">
          <span style="font-size:20px;">Ghost Writer Register</span>
        </el-form-item>

        <!-- 名称 -->
        <el-form-item prop="name">
          <el-input
            v-model="registerForm.name"
            placeholder="名称"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>

        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="用户名"
            prefix-icon="el-icon-postcard"
          ></el-input>
        </el-form-item>
        
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            type="password"
            show-password
          ></el-input>
        </el-form-item>

        <!-- 备注 -->
        <el-form-item prop="remark">
          <el-input
            v-model="registerForm.remark"
            placeholder="备注"
            prefix-icon="el-icon-document"
          ></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="info" @click="back" size="mini">返回</el-button>
          <el-button type="primary" @click="register" size="mini">注册</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import { addUser } from '@/database/api/user.js'
import { mapGetters, mapMutations } from 'vuex'
// import axios from 'axios'
export default {
  data () {
    return {
      registerForm: {
        username: '',
        password: '',
        name: '',
        remark: ''
      },
      // 注册表单验证规则
      registerFormRules: {
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
    
  },
  mounted(){
    // console.log(getUser(this.$db))
  },
  methods: {
    ...mapMutations('userData', ['setUser', ]),
    // 点击重置按钮，重置注册表单
    resetregisterForm () {
      this.$refs.registerFormRef.resetFields()
    },
    back(){
      this.$router.push('/login')
    },
    // 注册
    register () {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        console.log(this.registerForm)
        this.userData = this.registerForm
        window.sessionStorage.setItem('username', this.registerForm.username)
        window.sessionStorage.setItem('password', this.registerForm.password)
        this.$db = addUser(this.$db,this.registerForm)
        this.$router.push('/login')
        const news = {
          title: '注册',
          body: '注册成功，请登录！',
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

.register-page {
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

.register-box {
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

.register-form {
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
