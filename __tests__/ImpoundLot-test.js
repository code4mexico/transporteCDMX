import React from 'react'
import { shallow } from 'enzyme'
import ImpoundLot from '../src/components/ImpoundLot'
import impoundLotsFixture from './fixtures/impoundLots-fixture'

const impoundLot = impoundLotsFixture[0]
const impoundLotWithoutMap = impoundLotsFixture[1]

describe('ImpoundLot', () => {
  it('it renders correctly WITHOUT map', () => {
    const wrapper = shallow(<ImpoundLot impoundLot={impoundLotWithoutMap} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly WITH map', () => {
    const wrapper = shallow(<ImpoundLot impoundLot={impoundLot} />)
    expect(wrapper).toMatchSnapshot()
  })
})
