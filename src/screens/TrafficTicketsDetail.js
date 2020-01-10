import React from 'react'
import { FlatList, View } from 'react-native'
import PropTypes from 'prop-types'
import { Caption } from 'react-native-paper'
import TrafficTicket from '../components/TrafficTicket'
import SimplePlaceholder from '../components/SimplePlaceholder'
import { keyExtractor } from '../utils/list'
import { sharedStyles } from '../styles'
import { translate } from '../i18n'

const _renderItem = ({ item }) => <TrafficTicket ticket={item} />

const _renderEmptyPlaceholder = () => (
  <SimplePlaceholder
    imageURL={require('../assets/images/complete_task.png')}
    text={translate('no_traffic_tickets')}
    fullHeight
  />
)

const _getCountText = ticketsCount => {
  if (ticketsCount === 1) {
    return translate('one_traffic_ticket')
  }
  return translate('multiple_traffic_tickets').replace('_', ticketsCount)
}

const TrafficTicketsDetail = props => {
  const { trafficTickets } = props.route.params

  // TODO: We need to create a dictionary of year -> UMA relationship
  const _renderTotalInfractions = () => {
    if (trafficTickets?.length) {
      return (
        <>
          <View style={[sharedStyles.alignItemsCenter, sharedStyles.py2]}>
            <Caption>{_getCountText(trafficTickets.length)}</Caption>
            <Caption>{translate('fine_calculation')}</Caption>
          </View>
        </>
      )
    }

    return null
  }

  return (
    <FlatList
      data={trafficTickets}
      renderItem={_renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={_renderTotalInfractions}
      ListEmptyComponent={_renderEmptyPlaceholder}
    />
  )
}

TrafficTicketsDetail.propTypes = {
  route: PropTypes.object,
}

export default TrafficTicketsDetail
