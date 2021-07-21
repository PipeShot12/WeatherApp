export default function randomConuntries () {
  const sizeScreen = window.innerWidth
  const numberOfCountries = sizeScreen >= 1024 ? 4 : sizeScreen === 768 ? 2 : 0

  const arrCountries = ['Madrid', 'Bogotá', 'Rome', 'Washington', 'Caracas', 'Buenos Aires',
    'Moscow', 'Tokyo', 'London', 'Los Angeles', 'São Paulo', 'Santiago',
    'Hong Kong', 'Pekin', 'Singapore', 'Brussels', 'Istanbul', 'Toronto',
    'Dubai', 'Miami', 'Seoul', 'Barcelona', 'Jerusalem', 'Cancún', 'Athens', 'Sydney',
    'Munich', 'Cairo', 'Bangkok', 'Macau', 'Antalya', 'Taipei', 'Shanghai', 'Lisbon',
    'Berlin', 'Florence', 'Dublin', 'Cracow']
  const randomNumbers = []
  const candidateCountries = []
  while (randomNumbers.length < numberOfCountries) {
    const candidateNumber = Math.floor(Math.random() * arrCountries.length)
    if (randomNumbers.indexOf(candidateNumber) === -1) randomNumbers.push(candidateNumber)
  }

  randomNumbers.forEach((item) => {
    candidateCountries.push(arrCountries[item])
  })
  return candidateCountries
}
