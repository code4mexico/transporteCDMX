import React from 'react'
import { shallow } from 'enzyme'
import MetrobusMap from '../src/screens/MetrobusMap'
import metrobus from './fixtures/metrobus-fixture'
import navigation from './fixtures/navigation-fixture'

const params = { params: { metrobus, lineColor: '#042EC6' } }

describe('MetrobusMap', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(<MetrobusMap route={params} navigation={navigation} />)
    expect(wrapper).toMatchSnapshot()
  })
})
