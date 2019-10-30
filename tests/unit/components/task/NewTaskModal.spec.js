import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import flushPromises from 'flush-promises'
import mockState from '../../utils/mockState'
import NewTaskModal from '@/components/task/NewTaskModal'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VeeValidate)

describe('NewTaskModal', () => {
  let wrapper
  let store
  let actions
  let state
  let getters

  let mockError = 'This field is required'

  beforeEach(() => {
    state = mockState
    actions = {
      changeNewTaskModalState: jest.fn(),
      saveTask: jest.fn()
    }
    store = new Vuex.Store({
      state,
      getters,
      actions
    })

    wrapper = mount(NewTaskModal, {
      setData: ({
        task: {
          id: null,
          categoryId: 'c1',
          description: null,
          type: null,
          status: 'Oczekujące'
        },
        taskTypes: {
          feature: 'feature',
          bugfix: 'bugfix',
          default: 'default'
        },
        isEditing: false,
        isValid: true
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
    expect(actions.changeNewTaskModalState.mock.calls).toHaveLength(1)
  })
  it('calls `saveChanges` and validated inputs when button is clicked', async () => {
    wrapper.vm.$validator.validate = jest.fn(() => Promise.resolve(true))

    wrapper.vm.saveChanges()

    await flushPromises()

    expect(wrapper.vm.$validator.validate).toHaveBeenCalled()

    expect(actions.saveTask.mock.calls).toHaveLength(1)
    expect(actions.changeNewTaskModalState.mock.calls).toHaveLength(1)
    expect(wrapper.vm.isEditing).toBe(false)
  })
  it('catches an error during validation', async () => {
    wrapper.vm.editing = true
    wrapper.vm.$validator.validate = jest.fn(() => Promise.reject(mockError))

    wrapper.vm.saveChanges()

    await flushPromises()

    expect(wrapper.vm.$validator.validate).toHaveBeenCalled()
    expect(mockError).toBe('This field is required')
  })
})
