import React from 'react'
import { shallow } from 'enzyme'
import LoadingOverlay from '../src/components/LoadingOverlay'

describe('LoadingOverlay', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(<LoadingOverlay showOverlay />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly when showOverlay is FALSE', () => {
    const wrapper = shallow(<LoadingOverlay />)
    expect(wrapper).toMatchSnapshot()
  })
})
