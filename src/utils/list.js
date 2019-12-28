const keyExtractor = (_, index) => `${new Date().getTime() + index}`

export { keyExtractor }
