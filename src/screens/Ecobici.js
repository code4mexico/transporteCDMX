import React, { PureComponent } from 'react'
import moment from 'moment'
import { Marker } from 'react-native-maps'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Button, Subheading, ActivityIndicator } from 'react-native-paper'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import RBSheet from 'react-native-raw-bottom-sheet'
import theme, { sharedStyles } from '../styles'
import ECOBICI_STATIONS_JSON from '../assets/datasets/EcobiciStationsLocation.json'
import EcobiciStationModel from '../models/EcobiciStation'
import EcobiciStationDetail from '../components/EcobiciStationDetail'
import MapViewWithLocation from '../components/MapViewWithLocation'
import SimpleToast from '../components/SimpleToast'
import { getEcobiciStations } from '../api/endpoints'
import { HTTP_NO_CONTENT, HTTP_SUCCESS } from '../api/request'
import { translate } from '../i18n'
import { DEVICE_IS } from '../utils/device'

const DEFAULT_MAP_REGION = {
  latitude: 19.399,
  longitude: -99.173,
  latitudeDelta: 0.09,
  longitudeDelta: 0.09,
}

// TODO: Move this to ecobici class
const formatEcobiciStations = stations => {
  return stations.map(station => new EcobiciStationModel(station))
}

const DEFAULT_ECOBICI_STATIONS = formatEcobiciStations(ECOBICI_STATIONS_JSON)
const SHOW_TOAST_ON_TOP = true

const styles = StyleSheet.create({
  loaderContainer: {
    ...theme.colors.bgBlackOpacity,
    ...sharedStyles.flexDRow,
    ...sharedStyles.spaceBetween,
    ...sharedStyles.alignItemsCenter,
    ...sharedStyles.zIndex10,
    ...sharedStyles.p3,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
})

class Ecobici extends PureComponent {
  state = {
    activeMarker: {},
    ecobiciStations: DEFAULT_ECOBICI_STATIONS,
    error: false,
    isLoading: true,
    lastUpdate: null,
    serverLoaded: false,
  }

  componentDidMount() {
    this._fetchEcobiciStations()
  }

  _clearAndSetMarkers = setMarkerCallback => {
    // [] clears default pins on Android. We need to find a better solution
    if (DEVICE_IS.ANDROID) {
      this.setState({ ecobiciStations: [] }, setMarkerCallback)
    } else {
      setMarkerCallback()
    }
  }

  _ecobiciResponseSuccess = ecobiciResponse => {
    if (ecobiciResponse?.data?.response?.stations) {
      const ecobiciStations = ecobiciResponse.data.response.stations.map(stationResponse => {
        return new EcobiciStationModel(stationResponse)
      })
      this._clearAndSetMarkers(() => {
        this.setState({
          ecobiciStations,
          error: false,
          isLoading: false,
          serverLoaded: true,
          lastUpdate: moment().format('hh:mm:ss A '),
        })
      })
    } else {
      this._clearAndSetMarkers(() => {
        this.setState({
          ecobiciStations: DEFAULT_ECOBICI_STATIONS,
          error: true,
          isLoading: false,
          lastUpdate: 'Error',
        })
      })
    }
  }

  _ecobiciResponseHanlder = ecobiciResponse => {
    if (ecobiciResponse?.data?.code === HTTP_SUCCESS) {
      this._ecobiciResponseSuccess(ecobiciResponse)
    } else if (ecobiciResponse?.data?.code === HTTP_NO_CONTENT) {
      this._clearAndSetMarkers(() => {
        this.setState({
          ecobiciStations: DEFAULT_ECOBICI_STATIONS,
          error: false,
          isLoading: false,
          lastUpdate: 'Error',
        })
      })
    } else {
      this._clearAndSetMarkers(() => {
        this.setState({
          ecobiciStations: DEFAULT_ECOBICI_STATIONS,
          error: true,
          isLoading: false,
          lastUpdate: 'Error',
        })
      })
    }
  }

  _fetchEcobiciStations = async () => {
    this.setState({ isLoading: true, error: false })
    try {
      this._ecobiciResponseHanlder(await getEcobiciStations())
    } catch (e) {
      this.setState({ isLoading: false, error: true, lastUpdate: 'Error' })
    }
  }

  _onMarkerPressed = activeMarker => {
    return () => {
      if (this.state.serverLoaded) {
        this.setState({ activeMarker })
        if (this.RBSheet) {
          this.RBSheet.open()
        }
      } else {
        SimpleToast(translate('stations_load_needed'), SHOW_TOAST_ON_TOP)
      }
    }
  }

  _renderMarkers = () => {
    return this.state.ecobiciStations.map(station => {
      return (
        <Marker
          key={station.id}
          title={station.name}
          coordinate={station.coordinates}
          pinColor={this.state.serverLoaded ? station.pinColor : theme.colors.mediumGray}
          onPress={this._onMarkerPressed(station)}
        />
      )
    })
  }

  _renderLoader = () => {
    if (!this.state.serverLoaded) {
      return (
        <View style={styles.loaderContainer}>
          <Subheading style={theme.colors.colorPrimary}>
            {this.state.error ? translate('error') : translate('loading_stations')}
          </Subheading>
          {this.state.isLoading && !this.state.error && (
            <ActivityIndicator color={theme.colors.white} animating />
          )}
          {!this.state.isLoading && this.state.error && (
            <Button
              theme={theme}
              labelStyle={theme.colors.colorSecondary}
              mode="contained"
              onPress={this._fetchEcobiciStations}>
              {translate('retry')}
            </Button>
          )}
        </View>
      )
    }
    return null
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
        <MapViewWithLocation initialRegion={DEFAULT_MAP_REGION} style={sharedStyles.flex1}>
          {this._renderMarkers()}
        </MapViewWithLocation>
        {this._renderLoader()}
        <RBSheet
          ref={ref => {
            this.RBSheet = ref
          }}
          height={responsiveHeight(60)}
          closeOnDragDown>
          <EcobiciStationDetail
            station={this.state.activeMarker}
            fetchEcobiciStations={this._fetchEcobiciStations}
            isLoading={this.state.isLoading}
            lastUpdate={this.state.lastUpdate}
          />
        </RBSheet>
      </>
    )
  }
}

export default Ecobici
