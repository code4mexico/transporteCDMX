import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MapView, { Marker } from 'react-native-maps'
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import LoadingOverlay from '../components/LoadingOverlay'
import ErrorOverlay from '../components/ErrorOverlay'
import theme, { sharedStyles } from '../styles'
import storage from '../models/storage'
import { getMetroBusLines } from '../api/endpoints'
import { HTTP_NO_CONTENT, HTTP_SUCCESS } from '../api/request'
import MetrobusLine from '../models/MetrobusLine'
import { getLocationPermission } from '../utils/location'

const METROBUS_STORAGE_KEY = '@metrobusLines'
const DEFAULT_MAP_REGION = {
  latitude: 19.42,
  longitude: -99.135,
  latitudeDelta: 0.22,
  longitudeDelta: 0.22,
}

class Transit extends PureComponent {
  state = {
    metrobusLines: null,
    isLoading: true,
    error: false,
  }

  metrobusLines = null

  async componentDidMount() {
    SplashScreen.hide()
    getLocationPermission()
    this.metrobusLines = await storage.get(METROBUS_STORAGE_KEY)
    // TODO: We need to ask if ids are prone to change
    if (!this.metrobusLines) {
      this._fetchMetrobusLines()
    } else {
      this.setState({ metrobusLines: JSON.parse(this.metrobusLines), isLoading: false })
    }
  }

  _fetchMetrobusLines = async () => {
    this._metrobusLinesResponseHandler(await getMetroBusLines())
  }

  _metrobusLinesResponseSuccess = async metroBusResponse => {
    if (metroBusResponse?.data?.response) {
      const metrobusLines = metroBusResponse.data.response.map(metrobusLineResponse => {
        return new MetrobusLine(metrobusLineResponse)
      })
      await storage.set(METROBUS_STORAGE_KEY, JSON.stringify(metrobusLines))
      this.setState({ metrobusLines, error: false, isLoading: false })
    } else {
      this.setState({ metrobusLines: null, error: true, isLoading: false })
    }
  }

  _metrobusLinesResponseHandler = metroBusResponse => {
    if (metroBusResponse?.data?.code === HTTP_SUCCESS) {
      this._metrobusLinesResponseSuccess(metroBusResponse)
    } else if (metroBusResponse?.data?.code === HTTP_NO_CONTENT) {
      this.setState({ metrobusLines: [], error: false, isLoading: false })
    } else {
      this.setState({ metrobusLines: null, error: true, isLoading: false })
    }
  }

  _stationPressed = (station, lineColor) => {
    return () => {
      this.props.navigation.navigate('Station Detail', { station, lineColor })
    }
  }

  _renderLinesMarkers = () => {
    return this.state.metrobusLines?.map(line => {
      return line?.stations.map(station => {
        return (
          <Marker
            key={station.id}
            pinColor={line.color}
            coordinate={station.coordinates}
            onPress={this._stationPressed(station, line.color)}
          />
        )
      })
    })
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
          {this._renderLinesMarkers()}
        </MapView>
        <ErrorOverlay showOverlay={this.state.error} onPress={this._fetchMetrobusLines} />
        <LoadingOverlay showOverlay={this.state.isLoading} loaderColor={theme.colors.primary} />
      </>
    )
  }
}

Transit.propTypes = {
  navigation: PropTypes.object,
}

export default Transit
export { METROBUS_STORAGE_KEY }
