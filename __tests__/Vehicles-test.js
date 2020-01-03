import React from 'react'
import { shallow } from 'enzyme'
import Vehicles from '../src/screens/Vehicles'

describe('Vehicles', () => {
  it('it renders correctly initially', () => {
    const wrapper = shallow(<Vehicles />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly when search is enabled', () => {
    const wrapper = shallow(<Vehicles />)
    wrapper.setState({ searchActive: true })
    expect(wrapper).toMatchSnapshot()
  })
})
