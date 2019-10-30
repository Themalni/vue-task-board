import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import mockState from '../../utils/mockState'
import ViewTaskModal from '@/components/task/ViewTaskModal'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VeeValidate)

describe('ViewTaskModal', () => {
  let wrapper
  let store
  let actions
  let state
  let getters

  beforeEach(() => {
    state = mockState.state
    getters = {
      activeTask: () => state.categories[0].tasks[0],
      editModalIsOpen: () => false
    }
    actions = {
      changeViewTaskModalState: jest.fn(),
      changeNewTaskModalState: jest.fn(),
      saveTask: jest.fn(),
      saveChanges: jest.fn(),
      deleteTask: jest.fn()
    }
    store = new Vuex.Store({
      state,
      getters,
      actions
    })

    wrapper = mount(ViewTaskModal, {
      setData: ({
        isEditing: false,
        deleteModalIsOpen: false,
        taskTypes: {
          feature: 'feature',
          bugfix: 'bugfix',
          default: 'default'
        }
      }),
      store,
      localVue,
      sync: false
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('calls `closeModal` when button is clicked', () => {
    wrapper.vm.closeModal()
    expect(actions.changeViewTaskModalState.mock.calls).toHaveLength(1)
  })
  it('calls `openDeleteTaskModal` when button is clicked', () => {
    wrapper.vm.openDeleteTaskModal()
    expect(wrapper.vm.deleteModalIsOpen).toBeTruthy()
  })
  it('calls `closeDeleteModal` when button is clicked', () => {
    wrapper.vm.closeDeleteModal()
    expect(wrapper.vm.deleteModalIsOpen).toBeFalsy()
  })
  it('calls `setChanges` when button is clicked', () => {
    wrapper.vm.setChanges()
    expect(actions.saveChanges.mock.calls).toHaveLength(1)
    expect(actions.changeViewTaskModalState.mock.calls).toHaveLength(1)
  })
  it('calls `openNewTaskModal` when button is clicked', () => {
    wrapper.vm.openNewTaskModal()
    expect(actions.changeViewTaskModalState.mock.calls).toHaveLength(1)
    expect(actions.changeNewTaskModalState.mock.calls).toHaveLength(1)
  })
  it('calls `deleteSelectedTask` when button is clicked', () => {
    wrapper.vm.deleteSelectedTask()
    expect(actions.deleteTask.mock.calls).toHaveLength(1)
    expect(actions.changeViewTaskModalState.mock.calls).toHaveLength(1)
    expect(wrapper.vm.deleteModalIsOpen).toBeFalsy()
  })
})
