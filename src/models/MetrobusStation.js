const LOCATION_DELTA = 0.01

export default class MetrobusLine {
  constructor(metrobusStationResponse) {
    this.id = metrobusStationResponse.id
    this.name = metrobusStationResponse.nombre
    this.coordinates = {
      latitude: parseFloat(metrobusStationResponse.latitud),
      longitude: parseFloat(metrobusStationResponse.longitud),
      latitudeDelta: LOCATION_DELTA,
      longitudeDelta: LOCATION_DELTA,
    }
  }
}
