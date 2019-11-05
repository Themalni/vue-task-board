export default {
  changeNewTaskModalState (context, payload) { context.commit('CHANGE_NEW_TASK_MODAL_STATE', payload) },
  changeViewTaskModalState (context, payload) { context.commit('CHANGE_VIEW_TASK_MODAL_STATE', payload) },
  saveTask (context, payload) { context.commit('SAVE_TASK', payload) },
  setActiveCard (context, payload) { context.commit('SET_ACTIVE_CARD', payload) },
  saveChanges (context, payload) { context.commit('SAVE_CHANGES', payload) },
  deleteTask (context, payload) { context.commit('DELETE_TASK', payload) },
  moveTask (context, payload) { context.commit('MOVE_TASK', payload) }
}
