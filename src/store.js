
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import uuidv1 from 'uuid/v1'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({ storage: localStorage })

export default new Vuex.Store({
  state: {
    categories: [
      {
        id: 'c1',
        title: 'Oczekujące',
        tasks: [
          {
            id: '2e037380-d748-12e6-99be-5b4b2b69f7e9',
            categoryId: 'c1',
            description: 'Opis zadania #1',
            type: 'feature'
          },
          {
            id: '1de39732-f109-11e9-98be-1b5b2a69b7e9',
            categoryId: 'c1',
            description: 'Opis zadania #2',
            type: 'bugfix'
          },
          {
            id: '8ee39380-d450-32e0-03bb-0b232a69b89a',
            categoryId: 'c1',
            description: 'Opis zadania #3',
            type: 'default'
          }
        ]
      },
      {
        id: 'c2',
        title: 'W realizacji',
        tasks: []
      },
      {
        id: 'c3',
        title: 'Wykonane',
        tasks: []
      }
    ],
    modalIsOpen: false
  },
  getters: {
    tasks: state => state.tasks,
    categories: state => state.categories,
    modalIsOpen: state => state.modalIsOpen
  },
  mutations: {
    CHANGE_MODAL_STATE(state, payload) { state.modalIsOpen = payload },
    SAVE_TASK(state, task) {
      task.id = uuidv1()
      state.categories.filter(category => category.id === 'c1').map(item => item.tasks.push(task))
    }
    // SAVE_CHANGES(state, task) { Vue.set(state, 'tasks', [...task]) }
  },
  actions: {
    changeModalState(context, payload) { context.commit('CHANGE_MODAL_STATE', payload) },
    saveTask(context, payload) { context.commit('SAVE_TASK', payload) }
    // saveChanges(context, payload) { context.commit('SAVE_CHANGES', payload) }
  },
  plugins: [vuexLocalStorage.plugin]
})
