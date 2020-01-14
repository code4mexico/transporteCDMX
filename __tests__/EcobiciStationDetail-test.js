import React from 'react'
import { shallow } from 'enzyme'
import EcobiciStationDetail from '../src/components/EcobiciStationDetail'
import ecobiciStationFixture from './fixtures/ecobiciStation-fixture'

const fetchEcobiciStations = jest.fn

describe('EcobiciStationDetail', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(
      <EcobiciStationDetail
        station={ecobiciStationFixture}
        fetchEcobiciStations={fetchEcobiciStations}
        lastUpdate="07:19:56 PM"
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly when loading', () => {
    const wrapper = shallow(
      <EcobiciStationDetail
        station={ecobiciStationFixture}
        fetchEcobiciStations={fetchEcobiciStations}
        lastUpdate="07:19:56 PM"
        isLoading
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
