import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    num:10
  },
  getters: {
    result(state) {
      return state.count * state.num;
    }
  },
  mutations: {
    add() {
      this.state.count += 1
    },
    add5(state, num) {
      state.count += num
    },
    reduce(state) {
      state.count--
    }
  },
  actions: {
    reduceFn() {
      setTimeout(() => {
        this.commit('reduce')
      }, 1000);
    }
  },
  modules: {
  }
})
