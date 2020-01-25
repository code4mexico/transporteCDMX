import moment from 'moment'

// TODO: We need to create a dictionary of year -> UMA relationship
const UMA = 86.88

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
    return parseFloat(this._fine) * UMA
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
