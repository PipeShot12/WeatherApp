import React, { Component } from 'react'
import "./header.css"
import ModalWindow from "./Modal"

const WEATHER_API = process.env.REACT_APP_WEATHER_KEY;
const UNSPLASH_API = process.env.REACT_APP_UNSPLASH_KEY;

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suggestedCountries: [],
            mainCounty: { name: "", temp: "",desc:"" },
            mainCountyPhoto: ""
        }
    }
    normalize = (country) => {
        return country.charAt(0).toUpperCase() + country.slice(1)
    }
    suggestedPlacesNav = () => {

        let arrCountries = ["Madrid", "Bogotá", "Rome", "Washington", "Caracas", "Buenos Aires"
            , "Moscow", "Tokyo", "London", "Los Angeles", "São Paulo", "Santiago",
            "Hong Kong", "Pekin", "Singapore", "Brussels", "Istanbul", "Toronto",
            "Dubai", "Miami", "Seoul", "Barcelona", "Jerusalem", "Cancún", "Athens", "Sydney",
            "Munich", "Cairo", "Bangkok", "Macau", "Antalya", "Taipei", "Shanghai", "Lisbon",
            "Berlin", "Florence", "Dublin", "Cracow"]
        let randomNumbers = []
        let candidateCountries = []
        while(randomNumbers.length<4){
            let candidateNumber = Math.floor(Math.random() * arrCountries.length)
            if(randomNumbers.indexOf(candidateNumber)===-1) randomNumbers.push(candidateNumber);
        }

        randomNumbers.map((item) => {
            candidateCountries.push(arrCountries[item])
            return console.log("")
        }, 0)
        const countries = []
        const getSuggested = async(item,index)=>{
          
            let country;

            const reqWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${item}&units=metric&appid=${WEATHER_API}`)
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
    async countyImage(pais) {
        const reqPicture = await fetch(`https://api.unsplash.com/search/photos/?client_id=${UNSPLASH_API}&query=${pais}`)
        const resPicture = await reqPicture.json()
        if(resPicture.results.length>0){
                   
            this.setState({ mainCountyPhoto: resPicture.results[1].urls.full })
        }
        else{
            this.setState({ mainCountyPhoto: "https://images.unsplash.com/photo-1536257104079-aa99c6460a5a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"})
        }
    }
    enterHandler=(e)=>{
        if(e.key==="Enter"){
            this.searchPlace();
        }
    }
    searchPlace = async (e) => {

        const input = document.getElementById("lugar").value;
        if (input) {
            const reqWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${WEATHER_API}`);
            const resWeather = await reqWeather.json();
            if(resWeather.cod==="404"){
                this.modal.message("The Place Has Not Been Found")
                this.modal.openModal()
                document.getElementById("lugar").value=""
            }else{
                this.setState({ mainCounty: { name: this.normalize(input), temp: Math.floor(resWeather.main.temp),desc:resWeather.weather[0].main} })
                this.countyImage(input)
                const req = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${resWeather.coord.lat}&lon=${resWeather.coord.lon}&exclude=minutely,alerts&lang=en&units=metric&appid=4fb832d81bf25098541d8ad4bcbd4815`)
                const res = await req.json();
                this.props.getData(res, input, this.state.mainCountyPhoto)

            }
        }
        if(!input){
            this.modal.message("Write a Place")
            this.modal.openModal()
        }
    }
    suggestedPlace = (e, item) => {
        if (e.target.id === "sugerido") {
            document.getElementById("lugar").value = item
            this.searchPlace()
            let arr = this.suggestedPlacesNav()
            this.setState({
                suggestedCountries: arr
            })
        }
    }
    componentDidMount = () => {
        
        const initialState = async ()=>{
            const reqCountry = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=paris&units=metric&appid=${WEATHER_API}`)
            const resCountry = await reqCountry.json();
            this.setState({ mainCounty: { name: "Paris", temp: resCountry.main.temp.toFixed(0),desc:resCountry.weather[0].main } })
            this.countyImage(this.state.mainCounty.name)

            const reqDesc = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${resCountry.coord.lat}&lon=${resCountry.coord.lon}&exclude=minutely,alerts&lang=en&units=metric&appid=${WEATHER_API}`);
            const resDesc = await reqDesc.json();
            this.props.getData(resDesc,"",this.state.mainCountyPhoto)
        }
        initialState();
        let arr = this.suggestedPlacesNav()
        this.setState({
            suggestedCountries: arr
        })
        
    }
    render() {
        return (
            <div className="con-main py-3" style={{ backgroundImage: `linear-gradient(180deg ,rgba(231,123,113,0.6)2%,rgba(153,23,83,0.8)100%),url("${this.state.mainCountyPhoto}")` }}>
                <ModalWindow ref={e => this.modal = e}/>
                <div className="col-12 d-flex align-items-center justify-content-around">
                    <div className="d-sm-none d-lg-flex d-none">
                        {this.state.suggestedCountries.slice(0, 2)}
                    </div>
                    <div className="d-none d-sm-block d-lg-none ">
                        {this.state.suggestedCountries.slice(0, 1)}
                    </div>
                    <div className="wrapper-main d-md-flex align-items-center my-lg-4">
                        <div className="wrapper">
                            <div className="hex-main">
                                <img className="header-img" src={this.state.mainCountyPhoto} alt={this.state.mainCounty.name} />
                            </div>
                            <div className="d-block mt-2 circle-main" ></div>
                        </div>
                        <div className="d-block mx-lg-3 ml-sm-2 text-center mt-4">
                            <h6 >{this.state.mainCounty.name}</h6>
                            <h6>{this.state.mainCounty.desc}</h6>
                            <h5 >{this.state.mainCounty.temp} °C</h5>
                        </div>
                    </div>
                    <div className="d-sm-none d-lg-flex d-none">
                        {this.state.suggestedCountries.slice(2, 4)}
                    </div>
                    <div className="d-none d-sm-block d-lg-none">
                        {this.state.suggestedCountries.slice(2, 3)}
                    </div>
                </div>
                <div className="row d-flex justify-content-center mt-lg-2 mt-5 mx-sm-0">
                    <input className="mr-md-2 form-control col-lg-3 col-8" type="text" placeholder=" eg.City" id="lugar" autoComplete="off" onKeyPress={(e)=>this.enterHandler(e)}/>
                    <button className="col-md-auto col-8 mt-2 mt-md-0 mt-lg-0"id="boton" onClick={this.searchPlace}>Search</button>
                </div>
            </div>
        )
    }
}
