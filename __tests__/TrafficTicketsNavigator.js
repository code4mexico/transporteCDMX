import React from 'react'
import { shallow } from 'enzyme'
import TrafficTicketsNavigator from '../src/components/VehicleSections/TrafficTicketsNavigator'
import trafficTicket from './fixtures/trafficTicket-fixture'

const trafficTickets = [trafficTicket]

describe('TrafficTicketsNavigator', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(<TrafficTicketsNavigator />)
    wrapper.setState({ trafficTickets, isLoading: false })
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly when it has an error', () => {
    const wrapper = shallow(<TrafficTicketsNavigator />)
    wrapper.setState({ trafficTickets: null, isLoading: false, error: true })
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly when is loading', () => {
    const wrapper = shallow(<TrafficTicketsNavigator />)
    wrapper.setState({ trafficTickets: null, isLoading: true, error: false })
    expect(wrapper).toMatchSnapshot()
  })
})
