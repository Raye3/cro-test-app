import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      isAuth: false,
      user: {},
      token: null
    }
  },
  getters: {
    isAuth (state) {
      if (state.auth.isAuth) { return true }
      return false
    },
    getUser (state) {
      if (state.auth.isAuth) {
        return state.auth.user
      }
      return null
    },
    getToken (state) {
      if (state.auth.isAuth) { return 'token ' + state.auth.token }
      return false
    }
  },
  mutations: {
    setUser (state, payload) {
      state.auth.isAuth = true
      state.auth.user = payload
    },
    refreshToken (state, token) {
      state.auth.isAuth = true
      state.auth.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
