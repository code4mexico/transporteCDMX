import React from 'react'
import Toast from 'react-native-root-toast'

const DELAY = 1000
const BOTTOM_OFFSET = 50

const SimpleToast = (message, showOnTop = false) => {
  const position = showOnTop
    ? Toast.positions.TOP + BOTTOM_OFFSET
    : Toast.positions.BOTTOM - BOTTOM_OFFSET
  Toast.show(message, {
    duration: Toast.durations.LONG,
    shadow: true,
    animation: true,
    position,
    delay: DELAY,
  })
}

export default SimpleToast
