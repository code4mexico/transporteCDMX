import React, { PureComponent, Fragment } from 'react'
import { Text, StatusBar, ScrollView } from 'react-native'

class Vehicles extends PureComponent {
  render() {
    return (
      <Fragment>
        <ScrollView>
          <StatusBar barStyle="light-content" backgroundColor={'blue'} />
          <Text>Vehículos</Text>
        </ScrollView>
      </Fragment>
    )
  }
}

export default Vehicles
