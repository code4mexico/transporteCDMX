import React from 'react'
import { shallow } from 'enzyme'
import TrafficTicket from '../src/components/TrafficTicket'
import trafficTicket from './fixtures/trafficTicket-fixture'

describe('TrafficTicket', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(<TrafficTicket ticket={trafficTicket} />)
    expect(wrapper).toMatchSnapshot()
  })
})
