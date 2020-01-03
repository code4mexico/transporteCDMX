import React from 'react'
import { shallow } from 'enzyme'
import ErrorOverlay from '../src/components/ErrorOverlay'

describe('ErrorOverlay', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(<ErrorOverlay showOverlay />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly when showOverlay is FALSE', () => {
    const wrapper = shallow(<ErrorOverlay />)
    expect(wrapper).toMatchSnapshot()
  })
})
