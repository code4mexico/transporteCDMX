import React, { PureComponent, Fragment } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Snackbar } from 'react-native-paper'
import NavigationRow from '../NavigationRow'
import { translate } from '../../i18n'
import { getImpoundLots } from '../../api/endpoints'
import ImpoundLot from '../../models/ImpoundLot'
import { HTTP_SUCCESS } from '../../api/request'

// TODO: This should come from the server  ¯\_(ツ)_/¯
const RELEASE_CODE = '2'

class ImpoundLotNavigator extends PureComponent {
  state = {
    impoundLots: null,
    isLoading: true,
    error: false,
    errorVisibility: false,
  }

  _impoundLotsResponseSuccess = impoundLotsResponse => {
    if (impoundLotsResponse?.data) {
      const impoundLots = impoundLotsResponse.data.map(impoundLot => {
        return new ImpoundLot(impoundLot)
      })
      this.setState({ impoundLots, error: false })
    } else {
      this.setState({ impoundLots: null, error: true, errorVisibility: true })
    }
  }

  _impoundResponseHandler = async impoundsResponse => {
    if (impoundsResponse.status === HTTP_SUCCESS) {
      this._impoundLotsResponseSuccess(impoundsResponse)
    } else {
      this.setState({ impoundLots: null, error: true, errorVisibility: true })
    }
  }

  _getNavigationDetailLabel = () => {
    if (this.state.isLoading) {
      return translate('loading')
    }

    if (this.state.error) {
      return translate('error')
    }

    if (this.state.impoundLots?.length) {
      if (this.state.impoundLots[this.state.impoundLots.length - 1].code !== RELEASE_CODE)
        return translate('impounded')
    }

    return translate('not_impounded')
  }

  _unSetErrorVisibility = () => {
    this.setState({ errorVisibility: false })
  }

  _goToImpoundLots = () => {
    this.props.navigation.navigate('Impound Lots Detail', { impoundLots: this.state.impoundLots })
  }

  getImpoundLotsInfo = async () => {
    if (this.props.plateText) {
      try {
        this.setState({ isLoading: true, error: false, errorVisibility: false })
        this._impoundResponseHandler(await getImpoundLots(this.props.plateText))
        this.setState({ isLoading: false })
      } catch (e) {
        this.setState({ isLoading: false, error: true, errorVisibility: true })
        console.log(e)
      }
    }
  }

  render() {
    return (
      <Fragment>
        <NavigationRow
          onPress={this.state.error ? null : this._goToImpoundLots}
          iconName="car"
          iconColor="cornflowerblue"
          navigationDetail={this._getNavigationDetailLabel()}
          text={translate('impound_lot')}
          isLoading={this.state.isLoading}
        />
        <Snackbar
          visible={this.state.errorVisibility}
          onDismiss={this._unSetErrorVisibility}
          style={styles.snackbar}>
          {translate('there_was_an_error')}
        </Snackbar>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: -Dimensions.get('window').height / 2.4,
  },
})

export default ImpoundLotNavigator
