
import normalize from '../utils/normalize'
import moment from 'moment'
import './current.css'

export default function Current ({ nameCounty, photoCountry, tempData }) {
  const countryName = nameCounty ? normalize(nameCounty) : 'Paris'
  const arr = [tempData]
  let currentTime
  const currentTemperature = arr.map((item, index) => {
    if (item.current) {
      currentTime = moment(item.current.dt * 1000).format('dddd')
      return (
        <div key={'tempI' + index} className='text-center'>

          <h2>{countryName}</h2>
          <h4>{moment(item.current.dt * 1000).format('LT')}</h4>
          <h5>{moment(item.current.dt * 1000).format('MMMM D')}</h5>
          <h5 style={{ color: '#b11b61' }}>{moment(item.current.dt * 1000).format('dddd')}</h5>
          <h6 style={{ margin: '0px' }}><img style={{ width: '70px', margin: '0px' }} src={'http://openweathermap.org/img/wn/' + item.current.weather[0].icon + '@2x.png'} alt='' /></h6>
          <h2>{item.current.temp.toFixed(0)} °C</h2>

        </div>
      )
    }
    return console.log('')
  })
  const nextTemperature = arr.map(item => {
    const items = []
    if (item.daily) {
      for (let i = 0; i < 5; i++) {
        if (moment(item.daily[i].dt * 1000).format('dddd') !== currentTime) {
          items.push(
            <div key={'tempD' + i} className='d-flex align-items-center justify-content-between m-0 p-0'>
              <div>
                <h5 className='' style={{ color: '#b11b61' }}>{moment(item.daily[i].dt * 1000).format('dddd')}</h5>
              </div>
              <div>
                <span style={{ color: 'white', fontSize: '1.1rem' }}>{item.daily[i].temp.max.toFixed(1)} °C</span><img style={{ maxHeight: '30px' }} src={'http://openweathermap.org/img/wn/' + item.daily[i].weather[0].icon + '@2x.png'} alt={item.daily[i].weather.description} />
              </div>
            </div>

          )
        }
      }
    }
    return items
  })
  return (
    <div className='col-lg-4 col-12 main py-3' style={{ backgroundImage: `linear-gradient(45deg,rgba(102, 28, 41, 0.9)0%,rgba(114,17,54,0.8)100%),url("${photoCountry}")` }}>
      {currentTemperature}
      {nextTemperature}
    </div>

  )
}
