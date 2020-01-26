import React from 'react'
import { View } from 'react-native'
import { shallow } from 'enzyme'
import MapViewWithLocation from '../src/components/MapViewWithLocation'

describe('MapViewWithLocation', () => {
  it('it renders correctly', () => {
    const wrapper = shallow(<MapViewWithLocation />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('MapViewWithLocation', () => {
  it('it renders correctly with Children', () => {
    const wrapper = shallow(
      <MapViewWithLocation>
        <View />
      </MapViewWithLocation>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
