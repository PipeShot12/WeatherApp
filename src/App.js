import './App.css'
import Nav from './Nav/Nav'
import Header from './Header/Header'
import Current from './Current/Current'
import Today from './Today/Today'
import { useState } from 'react'

export default function App () {
  const [tempData, setTempData] = useState('')
  const [nameCounty, setNameCounty] = useState('')
  const [imageCountry, setImageCountry] = useState('')

  const getData = (tempData, countryInput, photo) => {
    if (tempData) {
      setTempData(tempData)
    }
    if (countryInput) {
      setNameCounty(countryInput)
    }
    if (photo) {
      setImageCountry(photo)
    }
  }

  return (
    <div>
      <div className='container-fluid my-sm-4 my-lg-5'>
        <div id='app' className='col-lg-11 col-12 mx-auto'>
          <div className='row'>
            <Nav />
            <div className='col-lg-11 col-12'>
              <div className='row'>
                <Header getData={getData} />
                <Current photoCountry={imageCountry} tempData={tempData} nameCounty={nameCounty} />
                <Today tempData={tempData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
