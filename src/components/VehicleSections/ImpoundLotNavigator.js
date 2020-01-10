import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
  }

  _impoundLotsResponseSuccess = impoundLotsResponse => {
    if (impoundLotsResponse?.data) {
      const impoundLots = impoundLotsResponse.data.map(impoundLot => {
        return new ImpoundLot(impoundLot)
      })
      this.setState({ impoundLots, error: false })
    } else {
      this.setState({ impoundLots: null, error: true })
    }
  }

  _impoundResponseHandler = async impoundsResponse => {
    if (impoundsResponse.status === HTTP_SUCCESS) {
      this._impoundLotsResponseSuccess(impoundsResponse)
    } else {
      this.setState({ impoundLots: null, error: true })
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

  _goToImpoundLots = () => {
    this.props.navigation.navigate('Impound Lots Detail', { impoundLots: this.state.impoundLots })
  }

  getImpoundLotsInfo = async () => {
    if (this.props.plateText) {
      try {
        this.setState({ isLoading: true, error: false })
        this._impoundResponseHandler(await getImpoundLots(this.props.plateText))
        this.setState({ isLoading: false })
      } catch (e) {
        this.setState({ isLoading: false, error: true })
        console.log(e)
      }
    }
  }

  render() {
    return (
      <>
        <NavigationRow
          onPress={this.state.error ? null : this._goToImpoundLots}
          iconName="car"
          iconColor="cornflowerblue"
          navigationDetail={this._getNavigationDetailLabel()}
          text={translate('impound_lot')}
          isLoading={this.state.isLoading}
        />
      </>
    )
  }
}

ImpoundLotNavigator.propTypes = {
  navigation: PropTypes.object,
  plateText: PropTypes.string,
}

export default ImpoundLotNavigator
