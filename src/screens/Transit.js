import React, { PureComponent, Fragment } from 'react'
import { Text, StatusBar, ScrollView } from 'react-native'

class Transit extends PureComponent {
  render() {
    return (
      <Fragment>
        <ScrollView>
          <StatusBar barStyle="light-content" backgroundColor={'blue'} />
          <Text>Home</Text>
        </ScrollView>
      </Fragment>
    )
  }
}

export default Transit
