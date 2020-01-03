import React from 'react'
import { shallow } from 'enzyme'
import NavigationRow from '../src/components/NavigationRow'

const onPress = jest.fn

describe('NavigationRow', () => {
  it('it renders correctly when active', () => {
    const wrapper = shallow(
      <NavigationRow
        navigationDetail="Detail"
        text="Navigation"
        iconName="home"
        iconColor="#AAA"
        onPress={onPress}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly when disabled', () => {
    const wrapper = shallow(<NavigationRow text="Navigation" iconName="home" iconColor="#AAA" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly when loading', () => {
    const wrapper = shallow(
      <NavigationRow
        text="Navigation"
        iconName="home"
        iconColor="#AAA"
        onPress={onPress}
        isLoading
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('it renders correctly without border', () => {
    const wrapper = shallow(
      <NavigationRow
        text="Navigation"
        iconName="home"
        iconColor="#AAA"
        navigationDetail="Detail"
        onPress={onPress}
        hideBorder
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
