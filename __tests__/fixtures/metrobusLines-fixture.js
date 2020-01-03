import metrobusStation from './metrobusStation-fixture'
const stationOne = metrobusStation
const stationTwo = metrobusStation
stationTwo.name = 'This is a station 2'
stationTwo.id = 7654321

const metrobusLine = {
  color: '#AAA',
  line: 'Linea 1',
  stations: [stationOne, stationTwo],
}

export default metrobusLine
