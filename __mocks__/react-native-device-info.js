jest.mock('react-native-device-info', () => {
  return {
    getModel: jest.fn(() => 'phone model'),
    getBuildNumber: jest.fn(() => 'build number'),
    getVersion: jest.fn(() => 'app version'),
    getSystemVersion: jest.fn(() => 'os version'),
    hasNotch: jest.fn(() => false),
  }
})
