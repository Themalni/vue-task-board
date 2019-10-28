import { mount, createLocalVue } from '@vue/test-utils'
import VeeValidate from 'vee-validate'
import Vuex from 'vuex'
import ViewTaskModal from '@/components/task/ViewTaskModal'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VeeValidate)
const validator = new VeeValidate.Validator()

describe('ViewTaskModal', () => {
  let wrapper
  let store
  let actions
  let mutations
  let state
  let getters

  // const optionsData = () => ({
  //   taskTypes: {
  //     feature: 'feature',
  //     bugfix: 'bugfix',
  //     default: 'default'
  //   }
  // })

  beforeEach(() => {
    state = {
      activeTask: null,
      editModalIsOpen: false
    }
    getters = {
      activeTask: () => {},
      editModalIsOpen: () => false
    }
    actions = {
      changeViewTaskModalState: jest.fn(),
      changeNewTaskModalState: jest.fn(),
      saveTask: jest.fn(),
      saveChanges: jest.fn(),
      deleteTask: jest.fn()
    }
    mutations = {

    }
    store = new Vuex.Store({
      getters,
      state,
      actions,
      mutations
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
      provide: () => ({
        $validator: validator
      }),
      methods: {},
      store,
      localVue,
      sync: false
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
  // it('renders correctly', () => {
  //   expect(wrapper.html()).toMatchSnapshot()
  // })
})
