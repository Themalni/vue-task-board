import { mount } from '@vue/test-utils'
import Card from '@/components/Card'

let wrapper
let card

beforeEach(() => {
  wrapper = mount(Card, {
    // props: {
    //   description: 'Test description'
    // },
    methods: {
      openCard: jest.fn(),
      truncateString: jest.fn()
    }
  })
  card = wrapper.find('.card')
})

describe('Card', () => {
  it('renters correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  // it('calls `truncateString` and returns shortened string', () => {
  //   const text = 'Some long text to shorten for testing purposes'
  //   card.vm.truncateString()
  //   expect(card.vm.truncateString(text, 14)).toBe('Some long text ...')
  // })
  it('does add class `description` when value is provided to prop', () => {
    const propsData = {
      description: 'Test description'
    }
    wrapper.setProps(propsData)
    const cardBody = wrapper.find('.card-body')
    expect(cardBody.text()).toBe('Test description')
  })
})
