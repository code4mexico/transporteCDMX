import axios from 'axios'
import DeviceInfo from 'react-native-device-info'
import { Platform } from 'react-native'
import SimpleToast from '../components/SimpleToast'
import { translate } from '../i18n'

const REQUEST_TIMEOUT = 15000
export const HTTP_SUCCESS = 200
export const HTTP_NO_CONTENT = 204
export const HTTP_UNAUTHORIZED_CODE = 401
export const HTTP_FORBIDDEN_CODE = 403
export const HTTP_NOT_FOUND_CODE = 404
export const HTTP_CONFLICT_CODE = 409
export const HTTP_UNPROCESSABLE_ENTITY_CODE = 422
export const HTTP_SERVICE_UNAVAILABLE_CODE = 503

const BUILD_NUMBER = DeviceInfo.getBuildNumber()
const APP_VERSION = DeviceInfo.getVersion()
const OS_VERSION = DeviceInfo.getSystemVersion()
const DEVICE_OS = Platform.OS

const client = axios.create({
  timeout: REQUEST_TIMEOUT,
})

const handleErrorResponse = error => {
  if (error.response) {
    switch (error.response.status) {
      case HTTP_UNAUTHORIZED_CODE:
        SimpleToast(translate('error_unauthorized'))
        break
      case HTTP_FORBIDDEN_CODE:
        SimpleToast(translate('error_forbidden'))
        break
      case HTTP_SERVICE_UNAVAILABLE_CODE:
        SimpleToast(translate('error_unavailable'))
        break
      case HTTP_UNPROCESSABLE_ENTITY_CODE:
        SimpleToast(translate('error_unprocessable'))
        break
      case HTTP_NOT_FOUND_CODE:
        SimpleToast(translate('error_not_found'))
        break
      case HTTP_CONFLICT_CODE:
        SimpleToast(translate('error_conflict'))
        break
      default:
        SimpleToast(translate('error'))
        break
    }
  } else {
    SimpleToast(translate('error_internet'))
  }
}

const request = async ({ handleError = true, ...options }) => {
  try {
    return await client({ ...options })
  } catch (error) {
    if (handleError) {
      handleErrorResponse(error)
    }
    throw error
  }
}

export default request
