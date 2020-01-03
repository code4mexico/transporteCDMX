jest.mock('moment', () => {
  return jest.fn(() => {
    return {
      format: () => '2020-01-01 00:00',
      locale: jest.fn(),
    }
  })
})
