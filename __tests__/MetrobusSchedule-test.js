import React from 'react'
import { shallow } from 'enzyme'
import MetrobusSchedule from '../src/components/MetrobusSchedule'
import metrobus from './fixtures/metrobus-fixture'
import navigation from './fixtures/navigation-fixture'

const lineColor = '#AAA'

describe('MetrobusSchedule', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(
      <MetrobusSchedule navigation={navigation} lineColor={lineColor} metrobus={metrobus} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
