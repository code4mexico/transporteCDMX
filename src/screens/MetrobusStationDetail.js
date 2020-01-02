import React, { PureComponent } from 'react'
import { View, Text, FlatList } from 'react-native'
import moment from 'moment'
import { sharedStyles } from '../styles'
import Loader from '../components/Loader'
import SimplePlaceholder from '../components/SimplePlaceholder'
import { getMetrobusStationSchedule } from '../api/endpoints'
import { HTTP_SUCCESS } from '../api/request'
import Metrobus from '../models/Metrobus'
import MetrobusSchedule from '../components/MetrobusSchedule'
import ListHeader from '../components/ListHeader'
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
    const { station, lineColor } = this.props.route.params
    this.props.navigation.setOptions({ title: station.name, headerTintColor: lineColor })
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

  _renderErrorPlaceholder = () => (
    <SimplePlaceholder
      imageURL={require('../assets/images/network.png')}
      text={translate('error')}
    />
  )

  _renderItem = ({ item }) => (
    <MetrobusSchedule
      metrobus={item}
      navigation={this.props.navigation}
      lineColor={this.props.route.params.lineColor}
    />
  )

  _renderHeader = () =>
    this.state.lastUpdate && (
      <ListHeader text={`${translate('last_updated')} - ${this.state.lastUpdate}`} />
    )

  _renderEmptyPlaceholder = () => (
    <SimplePlaceholder
      imageURL={require('../assets/images/bus_driver.png')}
      text={translate('no_more_buses')}
      fullHeight
    />
  )

  _renderFooter = () => <View style={sharedStyles.mb3} />

  _pullToRefresh = () => {
    const { station } = this.props.route.params
    this.setState({ refreshing: true })
    this._requestStationSchedule(station.id)
  }

  render() {
    const { lineColor } = this.props.route.params
    if (this.state.isLoading) {
      return <Loader containerStyle={sharedStyles.flex1} color={lineColor} visible />
    }

    if (this.state.error) {
      return this._renderErrorPlaceholder()
    }

    return (
      <FlatList
        data={this.state.metrobusSchedule}
        refreshing={this.state.refreshing}
        onRefresh={this._pullToRefresh}
        renderItem={this._renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={this._renderHeader}
        ListEmptyComponent={this._renderEmptyPlaceholder}
        ListFooterComponent={this._renderFooter}
        style={[sharedStyles.fullRelativeHeight, sharedStyles.p3]}
      />
    )
  }
}

export default MetrobusStationDetail
