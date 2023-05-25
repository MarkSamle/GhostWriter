const state = () => ({
    collectId: 0
  })
    
  // 获取vuex状态
  const getters = {
    collectDataFrom: state => {
      return {
        collectId: state.collectId
      }
    }
  }
    
  const mutations = {
    setCollectId (state, value) {
      state.collectId = value
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
    