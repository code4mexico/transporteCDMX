import React, { PureComponent } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Linking, StatusBar, StyleSheet, View } from 'react-native'
import { Title, Paragraph, Button } from 'react-native-paper'
import RBSheet from 'react-native-raw-bottom-sheet'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { DEFAULT_MAP_REGION, openMapApp } from '../utils/location'
import theme, { sharedStyles } from '../styles'
import IMPOUND_LOTS_JSON from '../assets/datasets/ImpoundLotsLocation.json'
import { translate } from '../i18n'

class ImpoundLotsMap extends PureComponent {
  state = {
    activeMarker: {},
  }

  _onMarkerPressed = activeMarker => {
    return () => {
      this.setState({ activeMarker })
      if (this.RBSheet) {
        this.RBSheet.open()
      }
    }
  }

  _renderMarkers = () => {
    return IMPOUND_LOTS_JSON.map(impoundLot => {
      return (
        <Marker
          key={impoundLot.name}
          title={impoundLot.name}
          coordinate={impoundLot.coordinates}
          pinColor={theme.colors.accent}
          onPress={this._onMarkerPressed(impoundLot)}
        />
      )
    })
  }

  _callImpoundLot = () => {
    Linking.openURL(`tel://${this.state.activeMarker.phoneNumber}`)
  }

  _renderPhoneButton = () => {
    if (this.state.activeMarker.phoneNumber) {
      return (
        <Button
          color={theme.colors.accent}
          style={[sharedStyles.mb3, styles.button]}
          onPress={this._callImpoundLot}>
          {translate('call')}
        </Button>
      )
    }
    return null
  }

  _openMapApp = () => {
    openMapApp({
      address: this.state.activeMarker.address,
      coordinates: this.state.activeMarker.coordinates,
    })
  }

  _renderDirectionsButton = () => {
    return (
      <Button
        color={theme.colors.accent}
        style={[sharedStyles.alignSelfEnd, sharedStyles.mb3, styles.button]}
        onPress={this._openMapApp}>
        {translate('directions')}
      </Button>
    )
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
        <MapView
          initialRegion={DEFAULT_MAP_REGION}
          style={sharedStyles.flex1}
          showsUserLocation
          followsUserLocation>
          {this._renderMarkers()}
        </MapView>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref
          }}
          height={responsiveHeight(55)}
          closeOnDragDown>
          <View style={[sharedStyles.m3, sharedStyles.mb6]}>
            <Title style={styles.section}>{this.state.activeMarker.name}</Title>
            <Paragraph>{this.state.activeMarker.address}</Paragraph>
            <View style={[sharedStyles.spaceBetween, sharedStyles.flexDRow, sharedStyles.mt3]}>
              {this._renderPhoneButton()}
              {this._renderDirectionsButton()}
            </View>
          </View>
        </RBSheet>
      </>
    )
  }
}

const styles = StyleSheet.create({
  section: {
    color: theme.colors.accent,
  },
  button: {
    height: 50,
  },
})

export default ImpoundLotsMap
