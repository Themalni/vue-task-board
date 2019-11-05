import mutations from '@/store/mutations'
import mockState from '../utils/mockState'

let state

beforeEach(() => {
  state = mockState.state
})

describe('CHANGE_EDIT_TASK_MODAL_STATE', () => {
  it('Changes editTaskModalState', () => {
    mutations.CHANGE_EDIT_TASK_MODAL_STATE(state, true)
    expect(state.editModalIsOpen).toBeTruthy()
  })
})

describe('CHANGE_VIEW_TASK_MODAL_STATE', () => {
  it('Changes viewTaskModalState', () => {
    mutations.CHANGE_VIEW_TASK_MODAL_STATE(state, true)
    expect(state.viewModalIsOpen).toBeTruthy()
  })
})

describe('SAVE_CHANGES', () => {
  const editedTaskPayload = {
    id: '1de39732-f109-11e9-98be-1b5b2a69b7e9',
    categoryId: 'c1',
    description: 'Opis zadania #4 został zmieniony',
    type: 'feature',
    status: 'Oczekujące'
  }
  it('Saves changes in a task', () => {
    mutations.SAVE_CHANGES(state, editedTaskPayload)

    const editedTask = state.categories
      .find(category => category.id === editedTaskPayload.categoryId).tasks
      .find(task => task.id === editedTaskPayload.id)

    expect(state.categories[0].tasks.length).toBe(3)
    expect(editedTask.description).toBe(editedTaskPayload.description)
  })
})

describe('SAVE_TASK', () => {
  const task = {
    id: null,
    categoryId: 'c1',
    description: 'Opis zadania #4',
    type: 'default',
    status: 'Oczekujące'
  }
  it('Creates new task', () => {
    mutations.SAVE_TASK(state, task)
    const categoryTasks = state.categories[0].tasks
    const newTask = categoryTasks[categoryTasks.length - 1]
    expect(state.categories[0].tasks.length).toBe(4)
    expect(newTask.description).toBe(task.description)
  })
})

describe('SET_ACTIVE_CARD', () => {
  it('Sets task to view', () => {
    mutations.SET_ACTIVE_CARD(state, true)
    expect(state.activeTask).toBeTruthy()
  })
})

describe('DELETE_TASK', () => {
  const deleteTask = {
    id: '1de39732-f109-11e9-98be-1b5b2a69b7e9',
    categoryId: 'c1',
    description: 'Opis zadania #2',
    type: 'bugfix',
    status: 'Oczekujące'
  }
  it('Deletes a task', () => {
    const category = state.categories.find(category => category.id === deleteTask.categoryId)
    const taskIndex = () => category.tasks.findIndex(item => item.id === deleteTask.id)

    expect(taskIndex()).toBe(1)

    mutations.DELETE_TASK(state, deleteTask)

    expect(taskIndex()).toBe(-1)
  })
})

describe('MOVE_TASK', () => {
  const taskToMove = {
    id: 'c3',
    title: 'Wykonane',
    tasks: [
      {
        id: '1de39732-f109-11e9-98be-1b5b2a69b7e9',
        categoryId: 'c3',
        description: 'Opis zadania #2',
        type: 'bugfix',
        status: 'Wykonane'
      }
    ]
  }

  it('Move a task', () => {
    const categoryTasks = () => state.categories
      .find(category => category.id === taskToMove.id).tasks

    expect(categoryTasks()).not.toBe(taskToMove.tasks)

    mutations.MOVE_TASK(state, taskToMove)

    expect(categoryTasks()).toBe(taskToMove.tasks)
  })
})
