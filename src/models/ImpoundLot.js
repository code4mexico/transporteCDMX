import { translate } from '../i18n'

// TODO: This should come from the server  ¯\_(ツ)_/¯
const CODE_DETAIL = () => ({
  0: translate('impound_lot_in_transit'),
  1: translate('impound_lot_arrived'),
  2: translate('impound_lot_delivered'),
  3: translate('impound_lot_change'),
})

const LOCATION_DELTA = 0.01
const IN_TRANSIT_CODE = '0'
const ARRIVED_CODE = '1'
const RELOCATION_CODE = '3'

export default class ImpoundLot {
  constructor(impoundLotResponse) {
    this._id = impoundLotResponse.id
    this._code = impoundLotResponse.Codigo
    this._name = impoundLotResponse.nombre
    this._phone = impoundLotResponse.telefono
    this._policeCuadrant = impoundLotResponse.Cuadrante
    this._number = impoundLotResponse.No_Corralon
    this._carPlate = impoundLotResponse.Placas
    this._address = impoundLotResponse.direccion
    this._date = impoundLotResponse.fecha_humano
    this._hour = impoundLotResponse.hora_humano
    this._coordinates = {
      latitude: parseFloat(impoundLotResponse.coordx),
      longitude: parseFloat(impoundLotResponse.coordy),
    }
    this._location = {
      // TODO: This is duplicated from server ¯\_(ツ)_/¯
      latitude: impoundLotResponse.latitud,
      longitude: impoundLotResponse.Longitud,
    }
  }

  get formattedDate() {
    return this.formatDate()
  }

  get formattedStatus() {
    return this.formatCode()
  }

  get address() {
    return this.formatAddress()
  }

  get code() {
    return this._code
  }

  get coordinates() {
    return this.formatCoordinates()
  }

  get phoneNumber() {
    return this.formatPhoneNumber()
  }

  get showMap() {
    return this.mapShouldBeVisible()
  }

  formatDate() {
    return `${this._date} ${this._hour}`
  }

  formatCode() {
    return CODE_DETAIL()[this._code]
  }

  formatAddress() {
    return this._address
  }

  formatCoordinates() {
    return {
      ...this._coordinates,
      latitudeDelta: LOCATION_DELTA,
      longitudeDelta: LOCATION_DELTA,
    }
  }

  formatPhoneNumber() {
    return this._phone
  }

  mapShouldBeVisible() {
    return (
      this._code === IN_TRANSIT_CODE ||
      this._code === ARRIVED_CODE ||
      this._code === RELOCATION_CODE
    )
  }
}
