import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import draggable from 'vuedraggable'
import mockState from '../utils/mockState'
import BoardColumn from '@/components/BoardColumn'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(draggable)

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

describe('BoardColumn', () => {
  let wrapper
  let store
  let actions
  let state
  let getters

  beforeEach(() => {
    state = mockState.state
    getters = {
      viewModalIsOpen: () => false,
      activeTask: () => {}
    }
    actions = {
      changeViewTaskModalState: jest.fn(),
      setActiveCard: jest.fn(),
      moveTask: jest.fn()
    }
    store = new Vuex.Store({
      state,
      getters,
      actions
    })

    wrapper = mount(BoardColumn, {
      propsData: {
        category: state.categories[0]
      },
      store,
      localVue,
      sync: false,
      stabs: { draggable }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('does contain `column` element', () => {
    expect(wrapper.classes('column')).toBe(true)
  })
  it('calls `openTask` when card is clicked', () => {
    wrapper.vm.openTask()
    expect(actions.changeViewTaskModalState.mock.calls).toHaveLength(1)
    expect(actions.setActiveCard.mock.calls).toHaveLength(1)
  })
})
