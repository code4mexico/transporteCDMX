import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import Loader from './Loader'
import theme, { sharedStyles } from '../styles'

const LoadingOverlay = ({ showOverlay, loaderColor }) => {
  if (showOverlay) {
    return (
      <View style={[styles.overlay, theme.colors.bgBlackOpacity, sharedStyles.zIndex5]}>
        <Loader color={loaderColor} textStyle={theme.colors.colorPrimary} visible />
      </View>
    )
  }
  return null
}

const styles = StyleSheet.create({
  overlay: {
    ...sharedStyles.centerChild,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
})

export default memo(LoadingOverlay)
