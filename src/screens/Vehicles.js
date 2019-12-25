import React, { PureComponent, Fragment } from 'react'
import { Text, StatusBar, ScrollView } from 'react-native'
import theme from '../styles'

class Vehicles extends PureComponent {
  render() {
    return (
      <Fragment>
        <ScrollView>
          <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
          <Text>Vehículos</Text>
        </ScrollView>
      </Fragment>
    )
  }
}

export default Vehicles
