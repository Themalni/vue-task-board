import { mount } from '@vue/test-utils'
import Modal from '@/components/Modal'

describe('Modal', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Modal)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('receives text when value is provided to `title` prop', () => {
    const props = {
      title: 'Edit task'
    }
    wrapper.setProps(props)
    expect(wrapper.props('title')).toBe('Edit task')
  })
  it('dy default status element is hidden', () => {
    const modalStatus = wrapper.findAll('.modal-header-text')

    expect(wrapper.vm.status).toBe(false)
    expect(modalStatus.length).toBe(1)
  })
  it('has status element visible when prop `status` is set to true', () => {
    const props = {
      status: true
    }
    wrapper.setProps(props)

    const modalStatus = wrapper.findAll('.modal-header-text').at(1)
    expect(wrapper.props('status')).toBe(true)
    expect(modalStatus.isVisible()).toBe(true)
  })
  it('receives status text when value is provided to prop `status`', () => {
    const props = {
      status: 'Done'
    }
    wrapper.setProps(props)
    expect(wrapper.vm.status).toBe('Done')
  })
  it('by default does not receive class `w-25` when prop `small` is set to false', () => {
    expect(wrapper.vm.small).toBe(false)
    expect(wrapper.find('.modal').classes()).not.toContain('w-25')
  })
  it('receives class `w-25` when prop `small` is set to true', () => {
    const props = {
      small: true
    }
    wrapper.setProps(props)
    expect(wrapper.props('small')).toBe(true)
    expect(wrapper.find('.modal').classes()).toContain('w-25')
  })
})
