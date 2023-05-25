import Vue from 'vue'
import Vuex from 'vuex'
import storeData from './modules/storeData'
import docData from './modules/docData'
import userData from './modules/userData'
import collectData from './modules/collectData'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({ // 配置持久化本地存储
    paths: ['storeData','docData','userData','collectData'] // 配置只持久化存储
  })],
  state: {
  },
  mutations: {
  },

  actions: {
  },
  modules: {
    storeData,
    userData,
    collectData,
    docData
  }
})
