import React, { memo } from 'react'
import { View } from 'react-native'
import { sharedStyles } from '../styles'
import { Caption } from 'react-native-paper'

const ListHeader = ({ text }) => {
  return (
    <View style={[sharedStyles.mb3, sharedStyles.centerChild]}>
      <Caption>{text}</Caption>
    </View>
  )
}

export default memo(ListHeader)
