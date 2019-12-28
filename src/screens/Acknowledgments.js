import React, { PureComponent, Fragment } from 'react'
import { StatusBar, Text, View } from 'react-native'
import { Title, Headline } from 'react-native-paper'
import { sharedStyles } from '../styles'
import theme from '../styles'
import { translate } from '../i18n'
class Acknowledgments extends PureComponent {
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
        <View style={sharedStyles.m3}>
          <Headline>Code for Mexico</Headline>
          <Text>{translate('code_for_mexico_project')}</Text>
        </View>
      </Fragment>
    )
  }
}

// instagram.com/ndetito

export default Acknowledgments
