import React, { Fragment } from 'react'
import { FlatList, Text, View } from 'react-native'
import { Caption } from 'react-native-paper'
import TrafficTicket from '../components/TrafficTicket'
import { keyExtractor } from '../utils/list'
import { sharedStyles } from '../styles'
import { translate } from '../i18n'

const _renderItem = ({ item }) => <TrafficTicket ticket={item} />
// TODO: We need a nice illustration for this
const _renderEmptyPlaceholder = () => (
  <View>
    <Text>Empty</Text>
  </View>
)

const _getCountText = ticketsCount => {
  if (ticketsCount === 1) {
    return translate('one_traffic_ticket')
  }
  return translate('multiple_traffic_tickets').replace('_', ticketsCount)
}

// TODO: We need to create a dictionary of year -> UMA relationship
const _renderTotalInfractions = ticketsCount => {
  if (ticketsCount) {
    return (
      <Fragment>
        <View style={[sharedStyles.alignItemsCenter, sharedStyles.py2]}>
          <Caption>{_getCountText(ticketsCount)}</Caption>
          <Caption>{translate('fine_calculation')}</Caption>
        </View>
      </Fragment>
    )
  }
  return null
}

const TrafficTickets = props => {
  const { trafficTickets } = props.route.params
  return (
    <FlatList
      data={trafficTickets}
      renderItem={_renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={_renderTotalInfractions(trafficTickets.length)}
      ListEmptyComponent={_renderEmptyPlaceholder}
    />
  )
}

export default TrafficTickets
