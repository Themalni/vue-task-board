import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({ storage: localStorage })

export default new Vuex.Store({
  state: {
    tasks: []
  },
  getters: {
    tasks: state => state.tasks
  },
  mutations: {
    // OPEN_MODAL (state) { state.productPreview = [] }
  },
  actions: {
    // openModal (contex) { context.commit('OPEN_MODAL') }
  },
  plugins: [vuexLocalStorage.plugin]
})
