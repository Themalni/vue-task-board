import { mount } from '@vue/test-utils'
import Card from '@/components/Card'

describe('Card', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Card, {
      propsData: {
        description: ''
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('does contain `card` element', () => {
    expect(wrapper.classes('card')).toBe(true)
  })
  it('calls `truncateString` and returns shortened string', () => {
    const text = 'Some long text to shorten for testing purposes'
    wrapper.vm.truncateString(text, 14)

    expect(wrapper.vm.truncateString(text, 14)).toBe('Some long text...')
  })
  it('receives text when value is provided to `description` prop', () => {
    const propsData = {
      description: 'Test description'
    }
    wrapper.setProps(propsData)
    const taskDescription = wrapper.find('.card-body')

    expect(taskDescription.text()).toBe('Test description')
  })
  it('emits event `openCard`', () => {
    wrapper.vm.openCard()

    expect(wrapper.emitted().openCard).toBeTruthy()
    expect(wrapper.emitted().openCard.length).toBe(1)
  })
})
