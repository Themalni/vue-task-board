import { mount } from '@vue/test-utils'
import Button from '@/elements/buttons/Button'

let wrapper
let button

beforeEach(() => {
  wrapper = mount(Button)
  button = wrapper.find('button')
})

describe('Button', () => {
  it('does contain `button` element', () => {
    expect(button.is('button')).toBe(true)
  })
  it('renters correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('does not set button as disabled by default', () => {
    expect(button.attributes('disabled')).not.toBe('disabled')
  })
  it('does not set button as disabled by default', () => {
    const propsData = {
      disabled: true
    }
    wrapper.setProps(propsData)
    expect(button.attributes('disabled')).toBe('disabled')
  })
  it('does add class `button-primary` when value is provided to prop `color`', () => {
    const propsData = {
      color: 'button-primary'
    }
    wrapper.setProps(propsData)
    expect(button.classes('button-primary')).toBeTruthy()
  })
  it('emits event `addAction`', () => {
    wrapper.vm.$emit('addAction')

    const emitted = wrapper.emitted()

    expect(emitted.addAction.length).toBe(1)

    button.trigger('click')

    expect(emitted.addAction.length).toBe(2)
  })
})
