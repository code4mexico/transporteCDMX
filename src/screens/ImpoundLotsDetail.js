import React from 'react'
import { FlatList, View } from 'react-native'
import { keyExtractor } from '../utils/list'
import ImpoundLot from '../components/ImpoundLot'
import { sharedStyles } from '../styles'
import SimplePlaceholder from '../components/SimplePlaceholder'
import { translate } from '../i18n'

const _renderItem = ({ item }) => <ImpoundLot impoundLot={item} />
const _renderHeader = () => <View style={sharedStyles.mb3} />

const _renderEmptyPlaceholder = () => (
  <SimplePlaceholder
    imageURL={require('../assets/images/eco_car.png')}
    text={translate('no_impound_lot')}
    fullHeight
  />
)

const ImpoundLotsDetail = props => {
  const { impoundLots } = props.route.params
  return (
    <FlatList
      data={impoundLots.reverse()}
      renderItem={_renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={_renderHeader}
      ListEmptyComponent={_renderEmptyPlaceholder}
    />
  )
}

export default ImpoundLotsDetail
