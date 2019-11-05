import actions from '@/store/actions'

describe('Actions', () => {
  const context = {
    commit: jest.fn()
  }
  const payload = {}

  it('changeNewTaskModalState', () => {
    actions.changeNewTaskModalState(context, payload)
    expect(context.commit).toHaveBeenCalledWith('CHANGE_EDIT_TASK_MODAL_STATE', payload)
  })
  it('changeViewTaskModalState', () => {
    actions.changeViewTaskModalState(context, payload)
    expect(context.commit).toHaveBeenCalledWith('CHANGE_VIEW_TASK_MODAL_STATE', payload)
  })
  it('saveTask', () => {
    actions.saveTask(context, payload)
    expect(context.commit).toHaveBeenCalledWith('SAVE_TASK', payload)
  })
  it('setActiveCard', () => {
    actions.setActiveCard(context, payload)
    expect(context.commit).toHaveBeenCalledWith('SET_ACTIVE_CARD', payload)
  })
  it('saveChanges', () => {
    actions.saveChanges(context, payload)
    expect(context.commit).toHaveBeenCalledWith('SAVE_CHANGES', payload)
  })
  it('deleteTask', () => {
    actions.deleteTask(context, payload)
    expect(context.commit).toHaveBeenCalledWith('DELETE_TASK', payload)
  })
  it('moveTask', () => {
    actions.moveTask(context, payload)
    expect(context.commit).toHaveBeenCalledWith('MOVE_TASK', payload)
  })
})
