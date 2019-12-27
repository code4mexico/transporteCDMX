import React, { PureComponent, Fragment } from 'react'
import { StatusBar, Text, View } from 'react-native'
import theme from '../styles'

class SupportUs extends PureComponent {
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
        <View>
          <Text>Support us</Text>
        </View>
      </Fragment>
    )
  }
}

export default SupportUs
