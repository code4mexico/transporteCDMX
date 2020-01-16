/* eslint-disable no-undef */

jest.mock('react-native-localize', () => {
  return {
    language: jest.fn(),
    findBestAvailableLanguage: jest.fn(),
  }
})
