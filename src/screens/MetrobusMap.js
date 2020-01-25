import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MapView, { Marker } from 'react-native-maps'
import { sharedStyles } from '../styles'

class MetrobusMap extends PureComponent {
  componentDidMount() {
    const { metrobus, lineColor } = this.props.route.params
    this.props.navigation.setOptions({ title: metrobus.name, headerTintColor: lineColor })
  }

  _renderMarker = (metrobus, lineColor) => {
    return (
      <Marker
        key={metrobus.name}
        title={metrobus.name}
        coordinate={metrobus.coordinates}
        pinColor={lineColor}
      />
    )
  }

  render() {
    const { metrobus, lineColor } = this.props.route.params
    return (
      <MapView
        initialRegion={metrobus.coordinates}
        style={sharedStyles.flex1}
        showsUserLocation
        followsUserLocation>
        {this._renderMarker(metrobus, lineColor)}
      </MapView>
    )
  }
}

MetrobusMap.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
}

export default MetrobusMap
