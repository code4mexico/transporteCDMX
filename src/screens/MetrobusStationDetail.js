import React, { PureComponent, Fragment } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Caption, Card, Headline, Paragraph } from 'react-native-paper'
import moment from 'moment'
import theme, { sharedStyles } from '../styles'
import Loader from '../components/Loader'
import { getMetrobusStationSchedule } from '../api/endpoints'
import { HTTP_SUCCESS } from '../api/request'
import Metrobus from '../models/Metrobus'
import { keyExtractor } from '../utils/list'
import { translate } from '../i18n'

class MetrobusStationDetail extends PureComponent {
  state = {
    metrobusSchedule: null,
    lastUpdate: null,
    isLoading: true,
    refreshing: false,
    error: false,
  }

  componentDidMount() {
    const { station } = this.props.route.params
    this.props.navigation.setOptions({ title: station.name })
    this._requestStationSchedule(station.id)
  }

  _setError = () => {
    this.setState({
      metrobusSchedule: null,
      isLoading: false,
      error: true,
      refreshing: false,
      lastUpdate: 'Error',
    })
  }

  _metrobusResponseSuccess = metrobusResponse => {
    if (metrobusResponse?.data) {
      const metrobusSchedule = metrobusResponse.data.response?.metrobuses.map(metrobus => {
        return new Metrobus(metrobus)
      })
      this.setState({
        metrobusSchedule,
        error: false,
        isLoading: false,
        refreshing: false,
        lastUpdate: moment().format('hh:mm:ss A '),
      })
    } else {
      this._setError()
    }
  }

  _handleMetrobusScheduleResponse = metrobusResponse => {
    if (metrobusResponse?.data?.code === HTTP_SUCCESS) {
      this._metrobusResponseSuccess(metrobusResponse)
    } else {
      this._setError()
    }
  }

  _requestStationSchedule = async stationId => {
    try {
      this._handleMetrobusScheduleResponse(await getMetrobusStationSchedule(stationId))
    } catch (e) {
      console.log(e)
      this._setError()
    }
  }

  _renderErrorPlaceholder = () => {
    // TODO: Error placeholder
    return (
      <View style={[sharedStyles.centerChild, sharedStyles.flex1]}>
        <Text>Error</Text>
      </View>
    )
  }

  _renderItem = ({ item }) => {
    return (
      <Card style={sharedStyles.mb3}>
        <Card.Content>
          <View style={[sharedStyles.flex1, sharedStyles.spaceBetween, sharedStyles.flexDRow]}>
            <Paragraph style={styles.section}>{item.eta}</Paragraph>
            <Caption>{item.id}</Caption>
          </View>
          <Headline>{item.name}</Headline>
        </Card.Content>
      </Card>
    )
  }

  _renderHeader = () => {
    if (this.state.lastUpdate) {
      return (
        <View style={[sharedStyles.mb3, sharedStyles.centerChild]}>
          <Caption>{`${translate('last_updated')} - ${this.state.lastUpdate}`}</Caption>
        </View>
      )
    }
    return null
  }

  // TODO: We need a nice illustration for this
  _renderEmptyPlaceholder = () => (
    <View>
      <Text>Empty</Text>
    </View>
  )

  _pullToRefresh = () => {
    const { station } = this.props.route.params
    this.setState({ refreshing: true })
    this._requestStationSchedule(station.id)
  }

  render() {
    if (this.state.isLoading) {
      return <Loader containerStyle={sharedStyles.flex1} visible />
    }

    if (this.state.error) {
      return this._renderErrorPlaceholder()
    }

    return (
      <View style={sharedStyles.m3}>
        <FlatList
          data={this.state.metrobusSchedule}
          refreshing={this.state.refreshing}
          onRefresh={this._pullToRefresh}
          renderItem={this._renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={this._renderHeader}
          ListEmptyComponent={this._renderEmptyPlaceholder}
          style={sharedStyles.fullRelativeHeight}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  section: {
    color: theme.colors.accent,
  },
})

export default MetrobusStationDetail
