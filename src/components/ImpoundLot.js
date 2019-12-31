import React, { PureComponent } from 'react'
import { View, StyleSheet, Linking } from 'react-native'
import { Button, Caption, Card, Paragraph } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { translate } from '../i18n'
import theme, { sharedStyles } from '../styles'

class ImpoundLot extends PureComponent {
  _onCallPressed = () => {
    Linking.openURL(`tel://${this.props.impoudLot.phone}`)
  }
  // TODO: We might need to move it to a separate view or remove it. It sucks at performance
  _renderMap = () => {
    if (this.props.impoudLot.showMap) {
      return (
        <MapView style={styles.map} region={this.props.impoudLot.coordinates}>
          <Marker coordinate={this.props.impoudLot.coordinates} />
        </MapView>
      )
    }
    return null
  }

  render() {
    return (
      <Card style={[sharedStyles.mx3, sharedStyles.mb3]}>
        <Card.Content>
          <View style={[sharedStyles.flex1, sharedStyles.spaceBetween, sharedStyles.flexDRow]}>
            <Paragraph style={styles.section}>{this.props.impoudLot.formattedStatus}</Paragraph>
            <Caption>{this.props.impoudLot.formattedDate}</Caption>
          </View>
          <View style={sharedStyles.mt2}>
            <Caption>{translate('address')}</Caption>
            <Paragraph>{this.props.impoudLot.address}</Paragraph>
          </View>
          <View style={sharedStyles.mt3}>{this._renderMap()}</View>
        </Card.Content>
        <Card.Actions style={sharedStyles.flexEnd}>
          <Button color={theme.colors.accent} onPress={this._onCallPressed}>
            {translate('call')}
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
  map: {
    width: '100%',
    height: 200,
  },
})

export default ImpoundLot
