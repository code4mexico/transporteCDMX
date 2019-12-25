import React, { PureComponent, Fragment } from 'react'
import { Text, StatusBar, ScrollView } from 'react-native'

class Ecobici extends PureComponent {
  render() {
    return (
      <Fragment>
        <ScrollView>
          <StatusBar barStyle="light-content" backgroundColor={'blue'} />
          <Text>Ecobici</Text>
        </ScrollView>
      </Fragment>
    )
  }
}

export default Ecobici
