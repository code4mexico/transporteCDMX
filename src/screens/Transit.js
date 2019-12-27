import React, { PureComponent, Fragment } from 'react'
import MapView from 'react-native-maps'
import { StatusBar, View } from 'react-native'
import { DEFAULT_MAP_REGION } from '../utils/location'
import theme from '../styles'

class Transit extends PureComponent {
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
        <MapView initialRegion={DEFAULT_MAP_REGION} style={{ flex: 1 }} />
      </Fragment>
    )
  }
}

export default Transit
