import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import draggable from 'vuedraggable'
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
  it('dispatch `moveTask` action when items computed property is updated', () => {
    wrapper.vm.items = categoryTasks
    // BoardColumn.computed.items.set.call(categoryTasks)
    // console.log('Items: ', BoardColumn.computed.items)
    // expect(actions.moveTask.mock.calls).toHaveLength(1)
    // expect(mockStore.dispatch).toHaveBeenCalledWith('moveTask', {
    //   id: 'c1',
    //   title: 'Oczekujące',
    //   tasks: categoryTasks
    // })
  })
})
