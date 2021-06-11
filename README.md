# Information About this project

In this project I used several APIs as:
-Openweathermap for getting data of weather
-Unsplash for getting photos for each suggested country as well as main country

#

-This project also was made with react-create-app for its initialization

-This project made used bootstrap for styling a several components like Nav,Current,Header,Today as well as react-bootstrap for implementing modal window that It will show, if the user does not type a place and it press search, also when user type a place that does not exist in Openweathermap`s database

-This Project make use of environment variables with system of react-create-app built-in for for managing APIs keys

# Components explanation

-App is main component that has all components as children, as well as It is in charge to set data that come from Header component and send to rest of children

-Header is component that is in charge of get information from user like Input Text and send request to Openweathermap`s API and get a object with data and so with this object get a coordenates for later send another request to Openweathermaps API, but with different Endpoint that return information as weather for following days also weather for that day in intervals of 48 hours and the same time when the search is valid it does a request to Unsplash for getting a photo of that place that was type,so these data will send to App component via props that it is a function that get three arguments getData = (tempData, countryInput, photo); This component also has a function that generate four random unique number later with these numbers will fill a array call candidateCountries, but first it have to use to use a hard code array that has a name of places called arrCountries, It`s possible use map method for fill :
randomNumbers.map((item) => {
candidateCountries.push(arrCountries[item])
})
so It's necessary to make a function that use that array of strings for making request to Openweathermap and Unsplash and push into a final array called countries, that contains object with syntax JSX that will be rendered

const countries = []
const getSuggested = async(item,index)=>{

    let country;

    const reqWeather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${item}&units=metric&appid=${WEATHER_API}`)
    const resWeather = await reqWeather.json();
    let temp = resWeather.cod === "404" ? "" : resWeather.main.temp.toFixed(0);
    let desc = resWeather.cord === "404" ? "": resWeather.weather[0].main

    const reqPicture = await fetch(`https://api.unsplash.com/search/photos/?client_id=${UNSPLASH_API}&per_page=1&query=${item}`);
    const resPicture = await reqPicture.json();

    country = (
        <div className="hex-con d-flex align-items-center" key={"pais-" + index} >
            <div className="wrapper ">
                <div className="hex">
                    <img style={{cursor:"pointer"}} className="header-img" src={resPicture.results[0].urls.small} alt={item} id="sugerido" onClick={(e) =>this.suggestedPlace(e,item)} />
                </div>
                <div className="d-block circle" ></div>
            </div>
            <div className="d-block mx-lg-3 ml-sm-2" style={{zIndex:10}}>
                <h6 style={{zIndex:10}}>{item}</h6>
                <h6>{desc}</h6>
                <h6 >{temp} °C</h6>
            </div>
        </div>
            )

        countries.push(country);
        }
    candidateCountries.map(getSuggested)
    return  countries;

}

-Current receive an array with information of weather and url of a photo that get via props from App Component that information is current time, current weather, following days weather;

-Today receive the same array but with the weather of that day, but in intervals of one hour

-Nav is a simple navbar without functionalities
