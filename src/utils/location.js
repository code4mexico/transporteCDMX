import { Alert, Linking } from 'react-native'
import { DEVICE_IS } from './device'
import { translate } from '../i18n'

const APPLE_MAPS_URL_PREFIX = 'http://maps.apple.com/'
const GOOGLE_MAPS_URL_PREFIX = DEVICE_IS.IOS ? 'comgooglemaps://' : 'geo://'
const GOOGLE_MAPS_TEST_URL = `${GOOGLE_MAPS_URL_PREFIX}?q=0,0`
const APPLE_MAPS_TEST_URL = `${APPLE_MAPS_URL_PREFIX}?address=mexico`

const DEFAULT_MAP_REGION = {
  latitude: 19.39,
  longitude: -99.135,
  latitudeDelta: 0.3,
  longitudeDelta: 0.3,
}

const buildAppleMapsUrl = ({ coordinates }) => {
  const searchCoordinates = `${coordinates.latitude},${coordinates.longitude}`
  return `${APPLE_MAPS_URL_PREFIX}?address=${searchCoordinates}&sll=${searchCoordinates}&ll=${searchCoordinates}`
}

const buildGoogleMapsUrl = ({ coordinates }) => {
  const query = `${coordinates.latitude},${coordinates.longitude}`
  return `${GOOGLE_MAPS_URL_PREFIX}?q=${query}&center=${query}&zoom=15`
}

const openMapAppErrorAlert = () => {
  Alert.alert('Error', translate('there_was_an_error'), [{ text: 'OK', onPress: () => null }])
}

const openAppleMaps = addressParams => {
  Linking.openURL(buildAppleMapsUrl(addressParams)).catch(openMapAppErrorAlert)
}

const openGoogleMaps = addressParams => {
  Linking.openURL(buildGoogleMapsUrl(addressParams)).catch(openMapAppErrorAlert)
}

const openMapApp = addressParams => {
  Linking.canOpenURL(GOOGLE_MAPS_TEST_URL)
    .then(() => openGoogleMaps(addressParams))
    .catch(() => Linking.canOpenURL(APPLE_MAPS_TEST_URL).then(() => openAppleMaps(addressParams)))
    .catch(() => openMapAppErrorAlert())
}

export { DEFAULT_MAP_REGION, openMapApp }
