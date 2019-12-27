import Config from 'react-native-config'
import request from './request'

const POST = 'POST'
const GET = 'GET'
const PUT = 'PUT'
const DELETE = 'DELETE'

const getTrafficTickets = data => {
  return request({
    url: `${Config.INFRACTIONS_API}${data}`,
    method: GET,
  })
}

const getImpoundLots = data => {
  return request({
    url: `${Config.IMPOUND_LOT_API}${data}`,
    method: GET,
  })
}

const getVerificationCenters = () => {
  return request({
    url: `${Config.VERIFICATION_CENTERS_API}`,
    method: GET,
  })
}

const getVerificationCenter = (verificationCenterId, fuelType) => {
  return request({
    url: `${Config.VERIFICATION_CENTER_API}verificentro=${verificationCenterId}&combustible=${fuelType}`,
    method: GET,
  })
}

export { getTrafficTickets, getImpoundLots, getVerificationCenters, getVerificationCenter }
