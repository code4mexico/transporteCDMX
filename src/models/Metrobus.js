import { capitalizeString } from '../utils/functions'

const LOCATION_DELTA = 0.01

export default class Metrobus {
  constructor(metrobusResponse) {
    this._id = metrobusResponse.label
    this._name = metrobusResponse.destino
    this._distance = metrobusResponse.distancia
    this._eta = metrobusResponse.tiempo_llegar
    this._coordinates = {
      latitude: parseFloat(metrobusResponse.latitud),
      longitude: parseFloat(metrobusResponse.longitud),
      latitudeDelta: LOCATION_DELTA,
      longitudeDelta: LOCATION_DELTA,
    }
  }

  get id() {
    return this._id
  }

  get name() {
    return capitalizeString(this._name)
  }

  get distance() {
    return this._distance
  }

  get eta() {
    return this._eta
  }

  get coordinates() {
    return this._coordinates
  }
}
