import React, { memo } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Caption } from 'react-native-paper'
import { translate } from '../i18n'
import theme, { sharedStyles } from '../styles'

const Loader = ({ visible, textStyle, color = theme.colors.accent, containerStyle }) => {
  if (visible) {
    return (
      <View style={[sharedStyles.centerChild, sharedStyles.m3, containerStyle]}>
        <ActivityIndicator color={color} animating />
        <Caption style={[sharedStyles.mt3, textStyle]}>{translate('loading')}</Caption>
      </View>
    )
  }
  return null
}

export default memo(Loader)
