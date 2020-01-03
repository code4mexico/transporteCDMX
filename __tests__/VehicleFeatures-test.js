import React from 'react'
import { shallow } from 'enzyme'
import VehicleFeatures from '../src/components/VehicleFeatures'

describe('VehicleFeatures', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(<VehicleFeatures />)
    expect(wrapper).toMatchSnapshot()
  })
})
