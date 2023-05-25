const state = () => ({
    id: 0,
    username:'',
    password:''
})

// 获取vuex状态
const getters = {
    userDataFrom: state => {
      return {
        id: state.id,
        username:state.username,
        password:state.password
      }
    }
}

const mutations = {
    setUser (state, value) {
        state.id = value.id??0
        state.username = value.username??''
        state.password = value.password??''
    },
}

const actions = {
}
  
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

    