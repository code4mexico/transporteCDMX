import React, { PureComponent } from 'react'
import { View, StyleSheet, Linking } from 'react-native'
import PropTypes from 'prop-types'
import { Button, Card, Caption, Paragraph } from 'react-native-paper'
import TrafficTicketModel from '../models/TrafficTicket'
import { translate } from '../i18n'
import theme, { sharedStyles } from '../styles'

// TODO: This sucks. We need to find a better solution
const PAYMENT_BASE_URL = 'https://www.tramites.cdmx.gob.mx/infracciones/?placa='

class TrafficTicket extends PureComponent {
  _onPaymentPressed = () => {
    Linking.openURL(PAYMENT_BASE_URL + this.props.ticket.carPlate)
  }

  render() {
    return (
      <Card style={[sharedStyles.mx3, sharedStyles.mb3]}>
        <Card.Content>
          <View style={[sharedStyles.flex1, sharedStyles.spaceBetween, sharedStyles.flexDRow]}>
            <Caption>{`${translate('folio')}: ${this.props.ticket.folio}`}</Caption>
            <Caption>{this.props.ticket.formattedDate}</Caption>
          </View>
          <View style={sharedStyles.mt2}>
            <Paragraph style={styles.section}>{translate('description')}</Paragraph>
            <Paragraph>{this.props.ticket.causeDetail}</Paragraph>
          </View>
          <View style={sharedStyles.mt2}>
            <Paragraph style={styles.section}>{translate('fine')}</Paragraph>
            <Paragraph>{`$${this.props.ticket.fine} MXN`}</Paragraph>
          </View>
        </Card.Content>
        <Card.Actions style={sharedStyles.flexEnd}>
          <Button color={theme.colors.accent} onPress={this._onPaymentPressed}>
            {translate('pay')}
          </Button>
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

TrafficTicket.propTypes = {
  ticket: PropTypes.instanceOf(TrafficTicketModel),
}

export default TrafficTicket
