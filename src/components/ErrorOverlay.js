import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Button, Subheading } from 'react-native-paper'
import theme, { sharedStyles } from '../styles'
import { translate } from '../i18n'

// TODO: This should show dynamic error strings for better error experience
const ErrorOverlay = ({ showOverlay, onPress }) => {
  if (showOverlay) {
    return (
      <View
        style={[
          styles.overlay,
          sharedStyles.centerChild,
          sharedStyles.zIndex5,
          sharedStyles.pb3,
          theme.colors.bgBlackOpacity,
        ]}>
        <Subheading
          style={[theme.colors.colorWhite, sharedStyles.p3, sharedStyles.textAlignCenter]}>
          {translate('there_was_an_error')}
        </Subheading>
        <Button
          onPress={onPress}
          theme={theme}
          labelStyle={theme.colors.colorSecondary}
          mode="contained">
          {translate('retry')}
        </Button>
      </View>
    )
  }
  return null
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
})

ErrorOverlay.propTypes = {
  showOverlay: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
}

export default memo(ErrorOverlay)
