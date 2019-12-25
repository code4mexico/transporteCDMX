const APPLE_MAPS_URL_PREFIX = 'http://maps.apple.com/'
const GOOGLE_MAPS_URL_PREFIX = true ? 'comgooglemaps://' : 'geo://'
const GOOGLE_MAPS_TEST_URL = `${GOOGLE_MAPS_URL_PREFIX}?q=0,0`
const APPLE_MAPS_TEST_URL = `${APPLE_MAPS_URL_PREFIX}?address=mexico`

const DEFAULT_MAP_REGION = {
  latitude: 19.39,
  longitude: -99.135,
  latitudeDelta: 0.3,
  longitudeDelta: 0.3,
}

const PERMISSIONS_STATUSES = {
  GRANTED: 'granted',
  DENIED: 'denied',
  NOT_GRANTED: 'notGranted',
  NOT_AVAILABLE: 'notAvailable',
}

const LOCATION_REQUEST_OPTIONS = {
  timeout: 10000,
  maximumAge: 300000,
  enableHighAccuracy: true,
}

export { DEFAULT_MAP_REGION }
