import { useEffect, useState, useRef } from 'react'
import randomConuntries from '../utils/randomCountries'
import { requestWeatherSuggested, countyImageRequest, searchPlaceTemp, searchPlaceDetails } from '../services/requestToApi'
import normalize from '../utils/normalize'
import GetSuggested from '../SuggestedPlaces/GetSuggested'
import './header.css'
import ModalWindow from './Modal'

export default function Header ({ getData }) {
  const [suggestedCountries, setSuggestedCountries] = useState([])
  const [mainCountyPhoto, setMainCountyPhoto] = useState('')
  const [mainCounty, setMainCountry] = useState({ name: '', temp: '', desc: '' })
  const modalRef = useRef()

  useEffect(() => {
    (async () => {
      const resWeather = await searchPlaceTemp('Paris')
      setMainCountry({ name: 'Paris', temp: resWeather.main.temp.toFixed(0), desc: resWeather.weather[0].main })
      const countyImageRes = await countyImageRequest('Paris')
      setMainCountyPhoto(countyImageRes)

      const resDetails = await searchPlaceDetails(resWeather)
      getData(resDetails, '', countyImageRes)
    })()
    const arr = suggestedPlacesNav()
    setSuggestedCountries(arr)
  }, [])

  const suggestedPlacesNav = () => {
    const countries = []
    const getSuggested = async (item, index) => {
      let country
      const { temp, desc, resPicture } = await requestWeatherSuggested(item)

      country = <GetSuggested key={`suggested-country-${index}`} temp={temp} desc={desc} resPicture={resPicture} item={item} suggestedPlace={suggestedPlace} />

      countries.push(country)
    }
    randomConuntries().map(getSuggested)
    return countries
  }

  const searchPlace = async (e) => {
    e.preventDefault()
    const input = document.getElementById('lugar').value
    if (input) {
      const resWeather = await searchPlaceTemp(input)

      if (resWeather.cod === '404') {
        modalRef.current.message('The Place Has Not Been Found')
        modalRef.current.openModal()
        document.getElementById('lugar').value = ''
      } else {
        setMainCountry({ name: normalize(input), temp: resWeather.main.temp.toFixed(0), desc: resWeather.weather[0].main })
        const countyImageRes = await countyImageRequest(input)
        setMainCountyPhoto(countyImageRes)
        const resDetails = await searchPlaceDetails(resWeather)
        getData(resDetails, input, countyImageRes)
      }
    }
    if (!input) {
      modalRef.current.message('Write a Place')
      modalRef.current.openModal()
    }
  }
  const suggestedPlace = (e, item) => {
    console.log(e, item)
    if (e.target.id === 'sugerido') {
      document.getElementById('lugar').value = item
      searchPlace(e)
      const arr = suggestedPlacesNav()
      setSuggestedCountries(arr)
    }
  }

  return (
    <div className='con-main py-3' style={{ backgroundImage: `linear-gradient(180deg ,rgba(231,123,113,0.6)2%,rgba(153,23,83,0.8)100%),url("${mainCountyPhoto}")` }}>
      <ModalWindow ref={modalRef} />
      <div className='col-12 d-flex align-items-center justify-content-around'>
        <div className='d-sm-none d-lg-flex d-none'>
          {suggestedCountries.slice(0, 2)}
        </div>
        <div className='wrapper-main d-md-flex align-items-center my-lg-4'>
          <div className='wrapper'>
            <div className='hex-main'>
              <img className='header-img' src={mainCountyPhoto} alt={mainCounty.name} />
            </div>
            <div className='d-block mt-2 circle-main' />
          </div>
          <div className='d-block mx-lg-3 ml-sm-2 text-center mt-4'>
            <h6>{mainCounty.name}</h6>
            <h6>{mainCounty.desc}</h6>
            <h5>{mainCounty.temp} °C</h5>
          </div>
        </div>
        <div className='d-sm-none d-lg-flex d-none'>
          {suggestedCountries.slice(2, 4)}
        </div>
      </div>
      <form onSubmit={searchPlace} className='row d-flex justify-content-center mt-lg-2 mt-5 mx-sm-0'>
        <input className='mr-md-2 form-control col-lg-3 col-8' type='text' placeholder=' eg.City' id='lugar' autoComplete='off' />
        <button className='col-md-auto col-8 mt-2 mt-md-0 mt-lg-0' id='boton'>Search</button>
      </form>
    </div>
  )
}
