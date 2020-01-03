import React from 'react'
import { shallow } from 'enzyme'
import ImpoundLotsDetail from '../src/screens/ImpoundLotsDetail'
import impoundLotsFixture from './fixtures/impoundLots-fixture'
import navigation from './fixtures/navigation-fixture'

const params = { params: { impoundLots: impoundLotsFixture } }
const emptyParams = { params: { impoundLots: [] } }

describe('ImpoundLotsDetail', () => {
  it('it renders correctly WITH Impound Lot details', () => {
    const wrapper = shallow(<ImpoundLotsDetail navigation={navigation} route={params} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly WITHOUT Impound Lot details', () => {
    const wrapper = shallow(<ImpoundLotsDetail navigation={navigation} route={emptyParams} />)
    expect(wrapper).toMatchSnapshot()
  })
})
