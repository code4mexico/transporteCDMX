import React, { memo } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { Caption, Card, Subheading } from 'react-native-paper'
import PropTypes from 'prop-types'
import { translate } from '../i18n'
import { StyleSheet, View } from 'react-native'
import { sharedStyles } from '../styles'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const VehicleFeatures = props => {
  const _goToImpoundLotsMap = () => {
    props.navigation.navigate('Impound Lots Map')
  }

  const _goToVerificentrosMap = () => {
    props.navigation.navigate('Verificentros Map')
  }

  return (
    <SwiperFlatList style={styles.swiperFlatList} pagingEnabled={false}>
      <Card style={styles.card} onPress={_goToImpoundLotsMap}>
        <Card.Cover style={styles.cover} source={require('../assets/images/impoundLot.jpg')} />
        <Card.Content>
          <Subheading style={styles.cardSubheading}>{translate('impound_lots')}</Subheading>
          <Caption>{translate('impound_lots_description')}</Caption>
        </Card.Content>
      </Card>
      <Card style={styles.card} onPress={_goToVerificentrosMap}>
        <Card.Cover style={styles.cover} source={require('../assets/images/verificentros.jpg')} />
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
    ...sharedStyles.mb3,
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

VehicleFeatures.propTypes = {
  navigation: PropTypes.object,
}

export default memo(VehicleFeatures)
