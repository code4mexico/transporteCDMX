import React, { memo } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Paragraph, ActivityIndicator } from 'react-native-paper'
import theme, { sharedStyles } from '../styles'

const CHEVRON_SIZE = 20

const NavigationRow = ({
  onPress,
  iconName,
  iconColor,
  iconSize = 20,
  text,
  navigationDetail,
  hideBorder,
  isLoading,
}) => {
  return (
    <View style={theme.colors.bgWhite}>
      <TouchableOpacity
        style={[
          sharedStyles.spaceBetween,
          sharedStyles.flexDRow,
          sharedStyles.alignItemsCenter,
          styles.container,
        ]}
        disabled={!onPress}
        onPress={onPress}>
        <Icon style={sharedStyles.mx3} name={iconName} size={iconSize} color={iconColor} solid />
        <Paragraph style={sharedStyles.flex1}>{text}</Paragraph>
        <View style={[sharedStyles.flexDRow, sharedStyles.mx2, sharedStyles.alignItemsCenter]}>
          <Paragraph style={[sharedStyles.mx2, theme.colors.colorMediumGray]}>
            {navigationDetail}
          </Paragraph>
          {isLoading && (
            <ActivityIndicator color={theme.colors.accent} animating style={sharedStyles.mr1} />
          )}
          {!isLoading && onPress && (
            <Icon name="chevron-right" size={CHEVRON_SIZE} color={theme.colors.lightGray} solid />
          )}
        </View>
      </TouchableOpacity>
      {!hideBorder && <View style={[sharedStyles.bottomBorder, sharedStyles.ml3]} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { height: 50 },
})

NavigationRow.propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  text: PropTypes.string,
  navigationDetail: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideBorder: PropTypes.bool,
  isLoading: PropTypes.bool,
}

export default memo(NavigationRow)
