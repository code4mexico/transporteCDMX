import React, { memo } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Caption } from 'react-native-paper'
import { translate } from '../i18n'
import theme, { sharedStyles } from '../styles'

const Loader = ({ visible }) => {
  if (visible) {
    return (
      <View style={[sharedStyles.centerChild, sharedStyles.m3]}>
        <ActivityIndicator color={theme.colors.accent} animating />
        <Caption style={sharedStyles.mt3}>{translate('loading')}</Caption>
      </View>
    )
  }
  return null
}

export default memo(Loader)
