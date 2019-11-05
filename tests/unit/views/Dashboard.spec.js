import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import mockState from '../utils/mockState'
import Dashboard from '@/views/Dashboard'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Dashboard', () => {
  let wrapper
  let store
  let state
  let getters

  beforeEach(() => {
    state = mockState
    getters = {
      categories: () => state.categories,
      newModalIsOpen: () => false
    }
    store = new Vuex.Store({
      state,
      getters
    })

    wrapper = mount(Dashboard, {
      data () {
        return {
          boardHeader: 'Tablica'
        }
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
  it('does contain `Board` element', () => {
    expect(wrapper.classes('board')).toBe(true)
  })
})
