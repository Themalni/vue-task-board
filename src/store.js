/* eslint-disable space-before-function-paren */

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
            type: 'feature',
            status: 'Oczekujące'
          },
          {
            id: '1de39732-f109-11e9-98be-1b5b2a69b7e9',
            categoryId: 'c1',
            description: 'Opis zadania #2',
            type: 'bugfix',
            status: 'Oczekujące'
          },
          {
            id: '8ee39380-d450-32e0-03bb-0b232a69b89a',
            categoryId: 'c1',
            description: 'Opis zadania #3',
            type: 'default',
            status: 'Oczekujące'
          }
        ]
      },
      {
        id: 'c2',
        title: 'W realizacji',
        tasks: [
          {
            id: '9ee39780-d400-32b0-03bb-0b232a69b89a',
            categoryId: 'c2',
            description: 'Opis zadania #4',
            type: 'default',
            status: 'W realizacji'
          }
        ]
      },
      {
        id: 'c3',
        title: 'Wykonane',
        tasks: []
      }
    ],
    editModalIsOpen: false,
    viewModalIsOpen: false,
    activeTask: null
  },
  getters: {
    categories: state => state.categories,
    editModalIsOpen: state => state.editModalIsOpen,
    viewModalIsOpen: state => state.viewModalIsOpen,
    activeTask: state => state.activeTask
  },
  mutations: {
    CHANGE_EDIT_TASK_MODAL_STATE(state, payload) {
      state.editModalIsOpen = payload
    },
    CHANGE_VIEW_TASK_MODAL_STATE(state, payload) {
      state.viewModalIsOpen = payload
    },
    SAVE_TASK(state, task) {
      task.id = uuidv1()
      state.categories.filter(category => category.id === 'c1').map(item => item.tasks.push(task))
    },
    SET_ACTIVE_CARD(state, id) {
      state.activeTask = state.categories
        .find(category => category.id === 'c1').tasks
        .find(task => task.id === id)
    },
    SAVE_CHANGES(state, editedTask) {
      const task = state.categories
        .find(category => category.id === 'c1').tasks
        .find(task => task.id === editedTask.id)
      task.description = editedTask.description
      task.type = editedTask.type
      state.activeTask = null
    },
    DELETE_TASK(state, payload) {
      const category = state.categories.find(category => category.id === payload.categoryId)
      const taskIndex = category.tasks.findIndex(item => item.id === payload.id)
      Vue.delete(category.tasks, taskIndex)
    },
    MOVE_TASK(state, payload) {
      const category = state.categories.find(category => category.id === payload.categoryId)
      const taskIndex = category.tasks.findIndex(item => item.id === payload.id)
      console.log("Payload from MOVE_TASK: ", payload)
      Vue.set(category[taskIndex], 'tasks', payload.tasks)
    }
  },
  actions: {
    changeNewTaskModalState(context, payload) { context.commit('CHANGE_EDIT_TASK_MODAL_STATE', payload) },
    changeViewTaskModalState(context, payload) { context.commit('CHANGE_VIEW_TASK_MODAL_STATE', payload) },
    saveTask(context, payload) { context.commit('SAVE_TASK', payload) },
    setActiveTask(context, payload) { context.commit('SET_ACTIVE_CARD', payload) },
    saveChanges(context, payload) { context.commit('SAVE_CHANGES', payload) },
    deleteTask(context, payload) { context.commit('DELETE_TASK', payload) },
    moveTask(context, payload) { context.commit('MOVE_TASK', payload) }
  },
  plugins: [vuexLocalStorage.plugin]
})
