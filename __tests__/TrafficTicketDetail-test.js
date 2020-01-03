import React from 'react'
import { shallow } from 'enzyme'
import TrafficTicketsDetail from '../src/screens/TrafficTicketsDetail'
import trafficTicket from './fixtures/trafficTicket-fixture'

const params = { params: { trafficTickets: [trafficTicket] } }
const emptyParams = { params: { trafficTickets: [] } }

describe('TrafficTicketsDetail', () => {
  it('it renders correctly WITH Traffic Tickets', () => {
    const wrapper = shallow(<TrafficTicketsDetail route={params} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly WITHOUT Traffic Tickets', () => {
    const wrapper = shallow(<TrafficTicketsDetail route={emptyParams} />)
    expect(wrapper).toMatchSnapshot()
  })
})
