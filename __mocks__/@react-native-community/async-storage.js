/* eslint-disable no-undef */

jest.mock('@react-native-community/async-storage', () => {
  return { create: jest.fn }
})
