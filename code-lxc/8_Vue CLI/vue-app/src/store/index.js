import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curMenu:{
      path:'/',
      name: "剧集",
      bgColor: " #ff0055 "
    }
  },
  mutations: {
    changeMenu(state,menu){
      state.curMenu = menu
    }
  },
  actions: {
  },
  modules: {
  }
})
