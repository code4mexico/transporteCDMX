import React from 'react'
import { FlatList, View, Text } from 'react-native'
import { keyExtractor } from '../utils/list'
import ImpoundLot from '../components/ImpoundLot'
import { sharedStyles } from '../styles'

const _renderItem = ({ item }) => <ImpoundLot impoudLot={item} />
const _renderHeader = () => <View style={sharedStyles.mb3} />
// TODO: We need a nice illustration for this
const _renderEmptyPlaceholder = () => (
  <View>
    <Text>Empty</Text>
  </View>
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
