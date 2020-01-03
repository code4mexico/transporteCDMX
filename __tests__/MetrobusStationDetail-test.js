import React from 'react'
import { shallow } from 'enzyme'
import MetrobusStationDetail from '../src/screens/MetrobusStationDetail'
import metrobusStation from './fixtures/metrobusStation-fixture'
import metrobus from './fixtures/metrobus-fixture'
import navigation from './fixtures/navigation-fixture'

const params = { params: { station: metrobusStation, lineColor: '#042EC6' } }
const metrobusSchedule = [metrobus]

describe('MetrobusStationDetail', () => {
  it('it renders correctly while loading', () => {
    const wrapper = shallow(<MetrobusStationDetail navigation={navigation} route={params} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly WITH Metrobus schedule', () => {
    const wrapper = shallow(<MetrobusStationDetail navigation={navigation} route={params} />)
    wrapper.setState({ isLoading: false, metrobusSchedule })
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly WITHOUT Metrobus schedule', () => {
    const wrapper = shallow(<MetrobusStationDetail navigation={navigation} route={params} />)
    wrapper.setState({ isLoading: false, metrobusSchedule: [] })
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly WITH error', () => {
    const wrapper = shallow(<MetrobusStationDetail navigation={navigation} route={params} />)
    wrapper.setState({ isLoading: false, error: true })
    expect(wrapper).toMatchSnapshot()
  })
})
