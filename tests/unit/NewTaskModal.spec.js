import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import flushPromises from 'flush-promises'
import NewTaskModal from '@/components/task/NewTaskModal'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VeeValidate)
// const validator = new VeeValidate.Validator()

const categoryTasks = [
  {
    id: '2e037380-d748-12e6-99be-5b4b2b69f7e9',
    categoryId: 'c1',
    description: 'Opis zadania #1',
    type: 'feature',
    status: 'Oczekujące'
  },
  {
    id: '2e037380-d748-12e6-99be-5b4b2b69f7e9',
    categoryId: 'c1',
    description: 'Opis zadania #1',
    type: 'feature',
    status: 'Oczekujące'
  }
]

describe('NewTaskModal', () => {
  let wrapper
  let store
  let actions
  let state
  let getters

  beforeEach(() => {
    state = {
      activeTask: null,
      editModalIsOpen: false,
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
      ]
    }
    getters = {
      taskId: () => '2e037380-d748-12e6-99be-5b4b2b69f7e9'
    }
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
      // stabs: {}
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
  it('calls `saveChanges` when button is clicked', async () => {
    wrapper.vm.saveChanges()

    wrapper.vm.$validator.validate = jest.fn(() => Promise.resolve(true))

    await flushPromises()

    // expect(wrapper.vm.errors.has('description')).toBe(false)

    expect(wrapper.vm.$validator.validate).toHaveBeenCalled()

    expect(actions.saveTask.mock.calls).toHaveLength(1)
    expect(actions.changeNewTaskModalState.mock.calls).toHaveLength(1)
    expect(wrapper.vm.this.isEditing).toBe(false)
  })
})
