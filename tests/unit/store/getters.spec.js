import getters from '@/store/getters'
import mockState from '../utils/mockState'

describe('Vuex getters', () => {
  let state

  beforeEach(() => {
    state = mockState
  })

  it('categories', () => {
    expect(getters.categories(state)).toBe(state.categories)
  })
  it('editModalIsOpen', () => {
    expect(getters.editModalIsOpen(state)).toBeFalsy()
  })
  it('viewModalIsOpen', () => {
    expect(getters.viewModalIsOpen(state)).toBeFalsy()
  })
  it('activeTask', () => {
    expect(getters.activeTask(state)).toBe(state.activeTask)
  })
})
