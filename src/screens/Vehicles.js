import React, { PureComponent } from 'react'
import { TextInput, StatusBar, StyleSheet, View } from 'react-native'
import { IconButton, Card, Caption } from 'react-native-paper'
import VehicleFeatures from '../components/VehicleFeatures'
import ImpoundLotNavigator from '../components/VehicleSections/ImpoundLotNavigator'
import TrafficTicketsNavigator from '../components/VehicleSections/TrafficTicketsNavigator'
import Loader from '../components/Loader'
import theme, { sharedStyles } from '../styles'
import { translate } from '../i18n'

class Vehicles extends PureComponent {
  state = {
    plateText: '',
    isLoading: false,
    searchActive: false,
  }

  _onChangeText = plateText => {
    if (plateText) {
      // TODO: Regex validation
      this.setState({ plateText })
    } else {
      this.setState({ plateText, searchActive: false })
    }
  }

  _onSubmitEditing = () => {
    if (this.state.plateText) {
      // TODO: Regex validation
      try {
        this.setState({ isLoading: true, searchActive: !!this.state.plateText })
        this.impoundLotsNavigator?.getImpoundLotsInfo()
        this.trafficTicketsNavigator?.getTrafficTicketsInfo()
        this.setState({ isLoading: false, searchActive: true })
      } catch (e) {
        this.setState({ isLoading: false, searchActive: false })
        console.log(e)
      }
    }
  }

  _featuresShouldBeVisible = () => {
    return !this.state.isLoading && !this.state.searchActive
  }

  _renderVehicleSections = () => {
    return (
      <View style={!this._featuresShouldBeVisible() ? null : sharedStyles.displayNone}>
        <ImpoundLotNavigator
          ref={ref => (this.impoundLotsNavigator = ref)}
          plateText={this.state.plateText}
          navigation={this.props.navigation}
        />
        <TrafficTicketsNavigator
          ref={ref => (this.trafficTicketsNavigator = ref)}
          plateText={this.state.plateText}
          navigation={this.props.navigation}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
        <View style={styles.searchView}>
          <Card style={styles.searchCard}>
            <View style={styles.searchViewContent}>
              <IconButton
                icon="magnify"
                color={theme.colors.accent}
                onPress={this._onSubmitEditing}
                animated
              />
              <TextInput
                value={this.state.plateText}
                onChangeText={this._onChangeText}
                onSubmitEditing={this._onSubmitEditing}
                disabled={this.state.isLoading}
                placeholderTextColor={theme.colors.mediumGray}
                style={styles.plateInput}
                placeholder={translate('type_your_plate')}
                underlineColorAndroid="transparent"
                autoCompleteType="off"
                clearButtonMode="while-editing"
                autoCorrect={false}
                spellCheck={false}
                blurOnSubmit
              />
            </View>
          </Card>
          {this._featuresShouldBeVisible() && (
            <Caption>{translate('vehicle_search_description')}</Caption>
          )}
        </View>
        {this._featuresShouldBeVisible() && <VehicleFeatures />}
        {this._renderVehicleSections()}
        <Loader visible={this.state.isLoading} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  searchView: {
    ...sharedStyles.pt3,
    ...sharedStyles.px2,
    ...sharedStyles.alignItemsCenter,
  },
  searchViewContent: {
    ...sharedStyles.flexDRow,
    ...sharedStyles.alignItemsCenter,
  },
  plateInput: {
    ...sharedStyles.flex1,
    height: 50,
  },
  searchCard: {
    ...sharedStyles.fullRelativeWidth,
    ...sharedStyles.pr2,
    ...sharedStyles.mb3,
    height: 50,
  },
})

export default Vehicles
