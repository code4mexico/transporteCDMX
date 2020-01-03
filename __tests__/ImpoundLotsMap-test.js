import React from 'react'
import { shallow } from 'enzyme'
import ImpoundLotsMap from '../src/screens/ImpoundLotsMap'

describe('ImpoundLotsMap', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(<ImpoundLotsMap />)
    expect(wrapper).toMatchSnapshot()
  })
})
