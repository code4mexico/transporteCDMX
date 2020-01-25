import { Alert, Linking } from 'react-native'
import { DEVICE_IS } from './device'
import { translate } from '../i18n'
import { check, request, openSettings, PERMISSIONS, RESULTS } from 'react-native-permissions'

const APPLE_MAPS_URL_PREFIX = 'http://maps.apple.com/'
const GOOGLE_MAPS_URL_PREFIX = DEVICE_IS.IOS ? 'comgooglemaps://' : 'geo://'
const GOOGLE_MAPS_TEST_URL = `${GOOGLE_MAPS_URL_PREFIX}?q=0,0`
const APPLE_MAPS_TEST_URL = `${APPLE_MAPS_URL_PREFIX}?address=mexico`
const LOCATION_PERMISSION = DEVICE_IS.IOS
  ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION

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

const locationDeniedAlert = () => {
  Alert.alert(
    translate('we_need_location_permissions'),
    translate('we_need_location_instructions'),
    [
      { text: translate('cancel'), onPress: () => null, style: 'cancel' },
      { text: translate('settings'), onPress: openSettings },
    ],
  )
}

const handleLocationPermissionResult = (result, successCallback) => {
  if (result === RESULTS.DENIED) {
    return successCallback()
  }
  return result === RESULTS.GRANTED
}

const requestLocation = () => {
  request(LOCATION_PERMISSION)
    .then(result => handleLocationPermissionResult(result, locationDeniedAlert))
    .catch(_ => false)
}

const getLocationPermission = () => {
  check(LOCATION_PERMISSION)
    .then(result => handleLocationPermissionResult(result, requestLocation))
    .catch(_ => false)
}

export { DEFAULT_MAP_REGION, openMapApp, getLocationPermission }
