import React, { memo } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { Caption, Card, Subheading } from 'react-native-paper'
import { translate } from '../i18n'
import { StyleSheet, View } from 'react-native'
import { sharedStyles } from '../styles'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const VehicleFeatures = () => {
  return (
    <SwiperFlatList style={styles.swiperFlatList} pagingEnabled={false}>
      <Card style={styles.card}>
        <Card.Cover style={styles.cover} source={{ uri: 'https://picsum.photos/500/300' }} />
        <Card.Content>
          <Subheading style={styles.cardSubheading}>{translate('impound_lots')}</Subheading>
          <Caption>{translate('impound_lots_description')}</Caption>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Cover style={styles.cover} source={{ uri: 'https://picsum.photos/500/300' }} />
        <Card.Content>
          <Subheading style={styles.cardSubheading}>{translate('verificentros')}</Subheading>
          <Caption>{translate('verificentros_description')}</Caption>
        </Card.Content>
      </Card>
      <View style={styles.phanthomView} />
    </SwiperFlatList>
  )
}

const styles = StyleSheet.create({
  swiperFlatList: {
    ...sharedStyles.mt3,
    ...sharedStyles.pl3,
  },
  card: {
    ...sharedStyles.mr3,
    width: responsiveWidth(80),
    height: responsiveHeight(45),
  },
  cover: {
    height: responsiveHeight(28),
  },
  cardSubheading: {
    ...sharedStyles.mt2,
  },
  phanthomView: {
    width: responsiveWidth(10),
  },
})

export default memo(VehicleFeatures)
