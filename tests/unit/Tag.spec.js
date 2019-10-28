import { mount } from '@vue/test-utils'
import Tag from '@/elements/Tag'

let wrapper
let tag

beforeEach(() => {
  wrapper = mount(Tag)
  tag = wrapper.find('.tag')
})

describe('Button', () => {
  it('does contain `tag` element', () => {
    expect(tag.classes('tag')).toBe(true)
  })
  it('renters correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('does add class `tag-feature` when value is provided to prop `type`', () => {
    const propsData = {
      type: 'feature'
    }
    wrapper.setProps(propsData)
    expect(tag.classes('tag-feature')).toBeTruthy()
  })
})
