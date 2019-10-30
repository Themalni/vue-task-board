import { mount, createLocalVue } from '@vue/test-utils'
import VeeValidate from 'vee-validate'
import flushPromises from 'flush-promises'
import Select from '@/elements/Select'

const localVue = createLocalVue()
localVue.use(VeeValidate)

const validator = new VeeValidate.Validator()

const optionsData = () => ({
  options: {
    first: 'First',
    second: 'Second',
    third: 'Third'
  }
})

const propKeysLength = () => {
  return Object.keys(optionsData().options).length
}

const optionsKeys = () => {
  return Object.keys(optionsData().options)
}

const optionsValues = () => {
  return Object.values(optionsData().options)
}

describe('Select', () => {
  let wrapper
  let select
  let selectOptions

  beforeEach(() => {
    wrapper = mount(Select,
      {
        propsData: {
          id: 'selectId',
          name: 'select-name',
          rules: 'required'
        },
        provide: () => ({
          $validator: validator
        }),
        localVue
      },
      { sync: false }
    )
    select = wrapper.find('select')
    selectOptions = select.findAll('option')
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('does contain select element', () => {
    expect(select.is('select')).toBe(true)
  })
  it('does contain select option', () => {
    expect(select.contains('option')).toBe(true)
  })
  it('does display empty value in default option', () => {
    expect(selectOptions.at(0).attributes('value')).toBe('')
  })
  it('does display default option with provided value', () => {
    const propsData = {
      defaultOption: 'Select an element'
    }
    wrapper.setProps(propsData)

    const defaultOption = selectOptions.at(0)

    expect(defaultOption.text()).toBe('Select an element')
  })
  it('does display list of options including default option', () => {
    wrapper.setProps(optionsData())

    const select = wrapper.find('select')
    const selectOptions = select.findAll('option')

    const lengthWithDefaultOption = propKeysLength() + 1

    expect(selectOptions.length).toBe(lengthWithDefaultOption)
  })
  it('renders correct key data in options attribute "value"', () => {
    wrapper.setProps(optionsData())

    const select = wrapper.find('select')
    const selectOptions = select.findAll('option')

    const selectOptionsValues = selectOptions.wrappers.map((w) => {
      return w.attributes('value')
    })

    expect(selectOptionsValues).toEqual(expect.arrayContaining(optionsKeys()))
  })
  it('does display text in options retrieved from prop "options"', () => {
    wrapper.setProps(optionsData())

    const select = wrapper.find('select')
    const selectOptions = select.findAll('option')

    const selectOptionsTexts = selectOptions.wrappers.map((w) => {
      return w.text()
    })

    expect(selectOptionsTexts).toEqual(expect.arrayContaining(optionsValues()))
  })
  it('does not contain any validation error classes by default at the beginning', () => {
    expect(select.classes()).not.toContain('has-error')
  })
  it('does trigger input change after click', () => {
    wrapper.vm.emitValue()
    wrapper.vm.$emit('emitValue')
    expect(wrapper.emitted().emitValue).toBeTruthy()
  })
  it('does display a value selected from the list of options', () => {
    const propsData = {
      defaultOption: 'Select...',
      options: {
        a: 'A',
        b: 'B'
      },
      value: 'Default value'
    }
    wrapper.setProps(propsData)

    const select = wrapper.find('select')
    const selectOptions = select.findAll('option')
    const selectedOption = selectOptions.at(2)

    selectedOption.setSelected()
    expect(select.element.value).toContain(selectedOption.element.value)
  })
  it('gets validated and becomes invalid when no option was selected', async () => {
    select.trigger('blur')
    await flushPromises()

    expect(wrapper.vm.errors.has('select-name')).toBe(true)
    expect(select.attributes('aria-invalid')).toContain('true')
  })
  it('gets validated and becomes valid when an option was selected', async () => {
    wrapper.setProps(optionsData())

    const select = wrapper.find('select')
    const selectOptions = select.findAll('option')

    selectOptions.at(2).setSelected()
    select.trigger('blur')
    await flushPromises()

    expect(wrapper.vm.errors.has('select-name')).toBe(false)
    expect(select.attributes('aria-invalid')).toContain('false')
  })
})
