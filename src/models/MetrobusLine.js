import MetrobusStation from './MetrobusStation'

export default class MetrobusLine {
  constructor(metrobusLineResponse) {
    this.color = metrobusLineResponse.color
    this.line = metrobusLineResponse.linea
    this.stations = this.buildMetrobusStations(metrobusLineResponse)
  }

  buildMetrobusStations = metrobusLineResponse => {
    return metrobusLineResponse?.estaciones?.map(station => {
      return new MetrobusStation(station)
    })
  }
}
