import * as moment from 'moment'

export default class TrafficTicket {
  constructor(trafficTicketResponse) {
    this._folio = trafficTicketResponse.folio
    this._date = trafficTicketResponse.fecha
    this._status = trafficTicketResponse.status
    this._charge = trafficTicketResponse.unidad_cuenta
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

  get chargedAmount() {
    return this.formatChargedAmount()
  }

  get folio() {
    return this.formatFolio()
  }

  get status() {
    return this.formatStatus()
  }

  generateCauseDetail() {
    return `Artículo ${this._detail.article}, fracción ${this._detail.fraction}, párrafo ${this._detail.article}, ​​​inciso ${this._detail.subsection}`
  }

  formatDate() {
    return moment(this._date)
  }

  formatChargedAmount() {
    return this._charge
  }

  formatFolio() {
    return this._folio
  }

  formatStatus() {
    return this._status
  }
}
