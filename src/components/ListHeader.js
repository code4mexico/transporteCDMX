import React, { memo } from 'react'
import PropTypes from 'prop-types'
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

ListHeader.propTypes = {
  text: PropTypes.string.isRequired,
}

export default memo(ListHeader)
