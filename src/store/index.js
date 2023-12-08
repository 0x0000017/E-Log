import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false,
  },
  getters: {
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
  },
  actions: {
  },
  modules: {
  }
})
