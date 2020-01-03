import React from 'react'
import { shallow } from 'enzyme'
import Acknowledgments from '../src/screens/Acknowledgments'

describe('Acknowledgments', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(<Acknowledgments />)
    expect(wrapper).toMatchSnapshot()
  })
})
