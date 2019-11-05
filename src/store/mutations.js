import Vue from 'vue'
import uuidv1 from 'uuid/v1'

export default {
  CHANGE_EDIT_TASK_MODAL_STATE (state, payload) {
    state.editModalIsOpen = payload
  },
  CHANGE_VIEW_TASK_MODAL_STATE (state, payload) {
    state.viewModalIsOpen = payload
  },
  SAVE_TASK (state, task) {
    task.id = uuidv1()
    state.categories.filter(category => category.id === 'c1').map(item => item.tasks.push(task))
  },
  SET_ACTIVE_CARD (state, payload) {
    state.activeTask = payload
  },
  SAVE_CHANGES (state, editedTask) {
    const task = state.categories
      .find(category => category.id === editedTask.categoryId).tasks
      .find(task => task.id === editedTask.id)
    task.description = editedTask.description
    task.type = editedTask.type
    state.activeTask = null
  },
  DELETE_TASK (state, payload) {
    const category = state.categories.find(category => category.id === payload.categoryId)
    const taskIndex = category.tasks.findIndex(item => item.id === payload.id)
    Vue.delete(category.tasks, taskIndex)
  },
  MOVE_TASK (state, payload) {
    const category = state.categories.find(item => item.id === payload.id)
    payload.tasks.map(item => {
      item.categoryId = payload.id
      item.status = payload.title
    })
    Vue.set(category, 'tasks', payload.tasks)
  }
}
