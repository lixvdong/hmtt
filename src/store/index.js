import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    refresh_token: localStorage.getItem('refresh_token') || ''
  },
  mutations: {
    getToken(state, val) {
      state.token = val
      localStorage.setItem('token', val)
    },
    getRefresh_token(state, val) {
      state.refresh_token = val
      localStorage.setItem('refresh_token', val)
    }
  },
  actions: {},
  modules: {}
})
