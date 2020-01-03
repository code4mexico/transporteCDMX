import React from 'react'
import { shallow } from 'enzyme'
import ListHeader from '../src/components/ListHeader'

describe('ListHeader', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(<ListHeader text="Header text" />)
    expect(wrapper).toMatchSnapshot()
  })
})
