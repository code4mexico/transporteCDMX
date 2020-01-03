import React from 'react'
import { shallow } from 'enzyme'
import SimplePlaceholder from '../src/components/SimplePlaceholder'

const image = require('../src/assets/images/programming_code.png')

describe('SimplePlaceholder', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(<SimplePlaceholder text="Placeholder" imageURL={image} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly with fullHeight', () => {
    const wrapper = shallow(<SimplePlaceholder text="Placeholder" imageURL={image} fullHeight />)
    expect(wrapper).toMatchSnapshot()
  })
})
