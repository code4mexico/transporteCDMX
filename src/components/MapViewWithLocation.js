/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import MapView from 'react-native-maps'
import { coordinateToRegion } from '../utils/location'

const MapViewWithLocation = props => {
  const [followsUserLocation, setFollowsUserLocation] = useState(true)
  const mapRef = useRef('map')
  const { children, ...mapProps } = props

  const _onUserLocationChange = event => {
    if (mapRef?.current && event && followsUserLocation) {
      mapRef.current.animateToRegion(coordinateToRegion(event.nativeEvent.coordinate))
      setFollowsUserLocation(false)
    }
  }

  return (
    <MapView
      ref={mapRef}
      onUserLocationChange={_onUserLocationChange}
      followsUserLocation={followsUserLocation}
      showsUserLocation
      {...mapProps}>
      {children}
    </MapView>
  )
}

MapViewWithLocation.propTypes = {
  children: PropTypes.node,
}

MapViewWithLocation.defaultProps = {
  children: [],
}

export default MapViewWithLocation
