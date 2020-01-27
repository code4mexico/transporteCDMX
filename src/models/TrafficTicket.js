import moment from 'moment'

const UMAS = {
  2009: 54.8,
  2010: 57.46,
  2011: 59.82,
  2012: 62.33,
  2013: 64.76,
  2014: 67.29,
  2015: 70.1,
  2016: 71.68,
  2017: 75.49,
  2018: 80.6,
  2019: 84.49,
  2020: 86.88,
}

export default class TrafficTicket {
  constructor(trafficTicketResponse, carPlate) {
    this._folio = trafficTicketResponse.folio
    this._carPlate = carPlate
    this._date = trafficTicketResponse.fecha
    this._status = trafficTicketResponse.status
    this._fine = trafficTicketResponse.unidad_cuenta
    this._detail = {
      article: trafficTicketResponse.articulo,
      fraction: trafficTicketResponse.fraccion,
      subsection: trafficTicketResponse.inciso,
      paragraph: trafficTicketResponse.parrafo,
      cause: trafficTicketResponse.motivo,
    }
  }

  get causeDetail() {
    return this.generateCauseDetail()
  }

  get formattedDate() {
    return this.formatDate()
  }

  get fine() {
    return this.formatFineAmount()
  }

  get folio() {
    return this.formatFolio()
  }

  get status() {
    return this.formatStatus()
  }

  get carPlate() {
    return this.formatCarPlate()
  }

  generateCauseDetail() {
    return this._detail.cause.toLowerCase().replace(/^\w/, c => c.toUpperCase())
  }

  formatDate() {
    return moment(this._date).format('L')
  }

  formatFineAmount() {
    return parseFloat(this._fine) * UMAS[moment(this._date).year()]
  }

  formatFolio() {
    return this._folio
  }

  formatStatus() {
    return this._status
  }

  formatCarPlate() {
    return this._carPlate
  }
}
