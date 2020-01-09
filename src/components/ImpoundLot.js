import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Linking } from 'react-native'
import { Button, Caption, Card, Paragraph } from 'react-native-paper'
import ImpoundLotModel from '../models/ImpoundLot'
import { translate } from '../i18n'
import theme, { sharedStyles } from '../styles'
import { openMapApp } from '../utils/location'

class ImpoundLot extends PureComponent {
  _onCallPressed = () => {
    Linking.openURL(`tel://${this.props.impoundLot.phone}`)
  }

  _onDirectionsPressed = () => {
    openMapApp({ coordinates: this.props.impoundLot.coordinates })
  }

  _renderButtons = () => {
    if (this.props.impoundLot.showMap) {
      return (
        <Fragment>
          <Button color={theme.colors.accent} onPress={this._onCallPressed}>
            {translate('call')}
          </Button>
          <Button color={theme.colors.accent} onPress={this._onDirectionsPressed}>
            {translate('directions')}
          </Button>
        </Fragment>
      )
    }
    return null
  }

  _renderAddress = () => {
    if (this.props.impoundLot.showMap) {
      return (
        <View style={sharedStyles.mt2}>
          <Caption>{translate('address')}</Caption>
          <Paragraph>{this.props.impoundLot.address}</Paragraph>
        </View>
      )
    }
    return null
  }

  render() {
    const { impoundLot } = this.props
    return (
      <Card style={[sharedStyles.mx3, sharedStyles.mb3]}>
        <Card.Content>
          <View style={[sharedStyles.flex1, sharedStyles.spaceBetween, sharedStyles.flexDRow]}>
            <Paragraph style={styles.section}>{impoundLot.formattedStatus}</Paragraph>
            <Caption>{impoundLot.formattedDate}</Caption>
          </View>
          {this._renderAddress()}
        </Card.Content>
        <Card.Actions style={impoundLot.showMap ? sharedStyles.spaceBetween : sharedStyles.flexEnd}>
          {this._renderButtons()}
        </Card.Actions>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  section: {
    color: theme.colors.accent,
  },
})

ImpoundLot.propTypes = {
  impoundLot: PropTypes.instanceOf(ImpoundLotModel),
}

export default ImpoundLot
