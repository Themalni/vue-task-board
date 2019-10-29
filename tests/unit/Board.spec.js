import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Board from '@/components/Board'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Board', () => {
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
      editModalIsOpen: () => false
    }
    actions = {
      changeNewTaskModalState: jest.fn()
    }
    store = new Vuex.Store({
      state,
      getters,
      actions
    })

    wrapper = mount(Board, {
      data () {
        return {
          id: 'testId'
        }
      },
      propsData: {
        header: 'Tablica'
      },
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
  it('does contain `board` element', () => {
    expect(wrapper.classes('board')).toBe(true)
  })
  it('calls `openModal` when button is clicked', () => {
    wrapper.find('button').trigger('click')
    expect(actions.changeNewTaskModalState.mock.calls).toHaveLength(1)
  })
})
