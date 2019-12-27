import * as moment from 'moment'

export default class ImpoundLot {
  constructor(impoundLotResponse) {
    this.id = impoundLotResponse.id
    this.code = impoundLotResponse.Codigo
    this.name = impoundLotResponse.nombre
    this.phone = impoundLotResponse.telefono
    this.policeCuadrant = impoundLotResponse.Cuadrante
    this.number = impoundLotResponse.No_Corralon
    this.carPlate = impoundLotResponse.Placas
    this.address = impoundLotResponse.direccion
    this.date = impoundLotResponse.fecha_humano
    this.hour = impoundLotResponse.hora_humano
    this.coordinates = {
      latitude: impoundLotResponse.coordx,
      longitude: impoundLotResponse.coordy,
    }
    this.location = {
      // TODO: This is duplicated from server ¯\_(ツ)_/¯
      latitude: impoundLotResponse.latitud,
      longitude: impoundLotResponse.Longitud,
    }
  }
}
