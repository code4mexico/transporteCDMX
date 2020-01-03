import React from 'react'
import { shallow } from 'enzyme'
import VerificentrosMap from '../src/screens/VerificentrosMap'

describe('VerificentrosMap', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(<VerificentrosMap />)
    expect(wrapper).toMatchSnapshot()
  })
})
