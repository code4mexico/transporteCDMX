import React, { PureComponent, Fragment } from 'react'
import MapView from 'react-native-maps'
import { StatusBar } from 'react-native'
import { DEFAULT_MAP_REGION } from '../utils/location'

class Transit extends PureComponent {
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="light-content" backgroundColor={'blue'} />
        <MapView initialRegion={DEFAULT_MAP_REGION} style={{ flex: 1 }} />
      </Fragment>
    )
  }
}

export default Transit
