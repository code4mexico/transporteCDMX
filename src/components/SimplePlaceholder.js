import React, { memo } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Caption } from 'react-native-paper'
import { sharedStyles } from '../styles'

const SimplePlaceholder = ({ text, imageURL, fullHeight }) => {
  return (
    <View style={[sharedStyles.mx3, sharedStyles.centerChild]}>
      <View style={[styles.imageContainer, fullHeight ? styles.fullHeight : styles.halfHeight]}>
        <Image style={styles.image} source={imageURL} />
      </View>
      <Caption style={[sharedStyles.mt3, sharedStyles.textAlignCenter]}>{text}</Caption>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  fullHeight: {
    height: 280,
  },
  halfHeight: {
    height: '58%',
  },
})

SimplePlaceholder.propTypes = {
  text: PropTypes.string,
  imageURL: PropTypes.number,
  fullHeight: PropTypes.bool,
}

export default memo(SimplePlaceholder)
