import React from 'react'
import { shallow } from 'enzyme'
import ImpoundLotNavigator from '../src/components/VehicleSections/ImpoundLotNavigator'
import impoundLots from './fixtures/impoundLots-fixture'

describe('ImpoundLotNavigator', () => {
  it('it renders correctly when NOT impounded', () => {
    const wrapper = shallow(<ImpoundLotNavigator />)
    wrapper.setState({ impoundLots, isLoading: false })
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly when impounded', () => {
    const wrapper = shallow(<ImpoundLotNavigator />)
    wrapper.setState({ impoundLots: [impoundLots[0]], isLoading: false })
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly when it has an error', () => {
    const wrapper = shallow(<ImpoundLotNavigator />)
    wrapper.setState({ impoundLots: null, isLoading: false, error: true })
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly when is loading', () => {
    const wrapper = shallow(<ImpoundLotNavigator />)
    wrapper.setState({ impoundLots: null, isLoading: true, error: false })
    expect(wrapper).toMatchSnapshot()
  })
})
