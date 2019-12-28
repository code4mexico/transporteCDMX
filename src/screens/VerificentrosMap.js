import React, { PureComponent, Fragment } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { Linking, StatusBar, StyleSheet, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { DEFAULT_MAP_REGION, openMapApp } from '../utils/location'
import theme, { sharedStyles } from '../styles'
import VERIFICENTROS_JSON from '../assets/datasets/VerificentrosLocation.json'
import { Button, Paragraph, Title } from 'react-native-paper'
import { translate } from '../i18n'

// TODO: We can use their API but we will MVP like this
const APPOINTMENT_SITE_URL = 'http://189.240.89.19:8080/DVC/DVCCitas/AgendarCita?Centro='

class VerificentrosMap extends PureComponent {
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
    return VERIFICENTROS_JSON.map(verificentro => {
      return (
        <Marker
          key={verificentro.id}
          title={verificentro.name}
          coordinate={{ latitude: verificentro.latitude, longitude: verificentro.longitude }}
          pinColor={theme.colors.accent}
          onPress={this._onMarkerPressed(verificentro)}
        />
      )
    })
  }

  _callVerificentro = () => {
    Linking.openURL(`tel://${this.state.activeMarker.phoneNumbers.split(';')[0].replace(/ /g, '')}`)
  }

  _renderPhoneButton = () => {
    if (this.state.activeMarker.phoneNumbers) {
      return (
        <Button
          color={theme.colors.accent}
          style={sharedStyles.mb3}
          onPress={this._callVerificentro}>
          {translate('call')}
        </Button>
      )
    }
    return null
  }

  _openMapApp = () => {
    openMapApp({
      address: this.state.activeMarker.address,
      coordinates: {
        latitude: this.state.activeMarker.latitude,
        longitude: this.state.activeMarker.longitude,
      },
    })
  }

  _renderDirectionsButton = () => {
    return (
      <Button color={theme.colors.accent} style={sharedStyles.mb3} onPress={this._openMapApp}>
        {translate('directions')}
      </Button>
    )
  }

  _openAppointmentsSite = () => {
    Linking.openURL(`${APPOINTMENT_SITE_URL}${this.state.activeMarker.id}`)
  }

  _renderAppointmentButton = () => {
    return (
      <Button
        color={theme.colors.accent}
        style={sharedStyles.mb3}
        onPress={this._openAppointmentsSite}>
        {translate('schedule_appointment')}
      </Button>
    )
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
        <MapView initialRegion={DEFAULT_MAP_REGION} style={sharedStyles.flex1}>
          {this._renderMarkers()}
        </MapView>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref
          }}
          height={responsiveHeight(65)}
          closeOnDragDown>
          <View style={[sharedStyles.m3, sharedStyles.mb6]}>
            <Title style={styles.section}>{this.state.activeMarker.gasType}</Title>
            <Paragraph>{this.state.activeMarker.address}</Paragraph>
            <View style={sharedStyles.mt3}>
              {this._renderPhoneButton()}
              {this._renderDirectionsButton()}
              {this._renderAppointmentButton()}
            </View>
          </View>
        </RBSheet>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  section: {
    color: theme.colors.accent,
  },
})

export default VerificentrosMap
