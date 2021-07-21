
const WEATHER_API = process.env.REACT_APP_WEATHER_KEY
const UNSPLASH_API = process.env.REACT_APP_UNSPLASH_KEY
const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1536257104079-aa99c6460a5a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'

export async function requestWeatherSuggested (item) {
  const reqWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${item}&units=metric&appid=${WEATHER_API}`)
  const resWeather = await reqWeather.json()
  const temp = resWeather.cod === '404' ? '' : resWeather.main.temp.toFixed(0)
  const desc = resWeather.cord === '404' ? '' : resWeather.weather[0].main

  const reqPicture = await fetch(`https://api.unsplash.com/search/photos/?client_id=${UNSPLASH_API}&per_page=1&query=${item}`)
  const resPicture = await reqPicture.json()
  return { temp, desc, resPicture }
}

export async function countyImageRequest (country) {
  const reqPicture = await fetch(`https://api.unsplash.com/search/photos/?client_id=${UNSPLASH_API}&query=${country}`)
  const resPicture = await reqPicture.json()
  return resPicture.results.length > 0 ? resPicture.results[1].urls.regular : DEFAULT_PHOTO
}

export async function searchPlaceTemp (input) {
  const reqWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${WEATHER_API}`)
  const resWeather = await reqWeather.json()
  return resWeather
}

export async function searchPlaceDetails (coordinates) {
  const req = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.coord.lat}&lon=${coordinates.coord.lon}&exclude=minutely,alerts&lang=en&units=metric&appid=4fb832d81bf25098541d8ad4bcbd4815`)
  const res = await req.json()
  return res
}
