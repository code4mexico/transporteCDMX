import React from 'react'
import { shallow } from 'enzyme'
import Loader from '../src/components/Loader'

describe('Loader', () => {
  it('it renders correctly when visible', () => {
    const wrapper = shallow(<Loader visible />)
    expect(wrapper).toMatchSnapshot()
  })
  it('it renders correctly when NOT visible', () => {
    const wrapper = shallow(<Loader />)
    expect(wrapper).toMatchSnapshot()
  })
})
