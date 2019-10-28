import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ViewTaskModal from '@/components/task/ViewTaskModal'

let wrapper
let store
let actions
let mutations
let state

const localVue = createLocalVue()
localVue.use(Vuex)

beforeEach(() => {
  actions = {

  }
  mutations = {

  }
  store = new Vuex.Store({
    actions,
    mutations,
    state
  })
  wrapper = mount(ViewTaskModal, {
    methods: {},
    store,
    localVue
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('ViewTaskModal', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
