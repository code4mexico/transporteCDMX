/* eslint-disable no-undef */
export const ANDROID = {}
export const IOS = {}
export const PERMISSIONS = { ANDROID, IOS }

export const RESULTS = {
  UNAVAILABLE: 'unavailable',
  DENIED: 'denied',
  BLOCKED: 'blocked',
  GRANTED: 'granted',
}

export const openSettings = jest.fn(async () => {})
export const check = jest.fn(async permission => RESULTS.GRANTED)
export const request = jest.fn(async permission => RESULTS.GRANTED)

export default {
  PERMISSIONS,
  RESULTS,
  openSettings,
  check,
  request,
}
