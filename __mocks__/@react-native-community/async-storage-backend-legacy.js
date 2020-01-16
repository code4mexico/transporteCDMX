/* eslint-disable no-undef */

jest.mock('@react-native-community/async-storage-backend-legacy', () =>
  jest.fn().mockImplementation(jest.fn),
)
