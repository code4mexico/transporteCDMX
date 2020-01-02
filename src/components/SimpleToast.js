import React from 'react'
import Toast from 'react-native-root-toast'

const DELAY = 1000
const BOTTOM_OFFSET = 50

const SimpleToast = message => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM - BOTTOM_OFFSET,
    shadow: true,
    animation: true,
    delay: DELAY,
  })
}

export default SimpleToast
