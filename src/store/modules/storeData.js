const state = () => ({
  mycolor: '#565252',
  myCodeStyle: 'vs2015',
  myOcrApi: 'http://ocr.a8a8a8.top/api/tr-run/',
  myAiApi: 'http://127.0.0.1:9090/',
  ainum: 50
})
  
// 获取vuex状态
const getters = {
  storeDataFrom: state => {
    return {
      mycolor: state.mycolor,
      myCodeStyle: state.myCodeStyle,
      myOcrApi: state.myOcrApi,
      myAiApi: state.myAiApi,
      ainum: state.ainum
    }
  }
}
  
const mutations = {
  setColor (state, value) {
    state.mycolor = value
  },
  setCodeStyle (state, value) {
    state.myCodeStyle = value
  },
  setOcrApi (state, value) {
    state.myOcrApi = value
  },
  setAiApi (state, value) {
    state.myAiApi = value
  },
  setAiNum (state, value) {
    state.ainum = value
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
  