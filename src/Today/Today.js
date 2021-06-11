import React, { Component } from 'react'
import "./today.css"
import moment from 'moment';


export default class Today extends Component {
    chooseColor(num){
        return parseInt(num) >= 20 ? "rgb(201, 181, 55)"
        : parseInt(num) < 20 && parseInt(num) > 10 ? "rgb(255, 97, 82)"
        : parseInt(num) >= 1 && parseInt(num) <= 10 ? "rgba(153,23,83,1)"
        : "rgba(104, 13, 165, 0.8)"
    }
    render() {
        const arr = (this.props.tempData.hourly||[])

        let maxTemp= Math.max(...arr.map(item=>item.temp)).toFixed(1);
        let minTemp= Math.min(...arr.map(item=>item.temp)).toFixed(1);

        const showBars = arr.map((item, index) => {
            let styleBar = Number(item.temp) >= 20 ? "rgb(201, 181, 55)"
                : parseInt(item.temp) < 20 && parseInt(item.temp) > 10 ? "rgb(255, 97, 82)"
                : parseInt(item.temp) >= 1 && parseInt(item.temp) <= 10 ? "rgba(153,23,83,1)"
                : "rgba(104, 13, 165, 0.8)"
            return (
                <div style={{ whiteSpace: "normal" }} className="text-center" key={"today-"+index}>
                    <div className="chart" style={{ width: "100px", position: "relative" }}>
                        <h6 style={{ fontSize: "0.9rem" }}>{moment(item.dt * 1000).format('LT')}</h6>
                        <h6><img style={{ width: "40px", margin: "0px" }} src={"http://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png"} alt="" /></h6>
                        <h6 style={{ fontSize: "0.9rem" }}>{item.temp.toFixed(1)} °C</h6>
                        <div style={{ borderLeft: `8px solid ${styleBar}`, height: "143px", position: "absolute", left: "46px" }}></div>
                        <div style={{ borderBottom: `8px solid ${styleBar}`, height: "150px", width: "20px", position: "absolute", left: "40px" }}></div>
                        <h6 style={{ fontSize: "0.9rem", position: "absolute", bottom: "-220px", left: "25px" }}>Feels Like: <p style={{ color: "rgb(216, 197, 75)" }}>{item.feels_like.toFixed(1)} °C</p></h6>
                    </div>
                </div>
            )
        }) 

   
    
        return (
            <div className="col-lg-8 col-12 today py-3 px-5" style={{scrollBehavior:"smooth"}}>
                
                <div className="d-flex justify-content-between">
                    <div>
                        <h2 className="d-inline mr-2 ">Today</h2>
                        <h2 className="d-inline arrow"><i className="fas fa-greater-than"></i></h2>
                    </div>
                    <div className="d-lg-flex align-items-center">
                        <div id="temps"/>
                        <h2 className="d-inline mr-2 ml-2">H<h2 className="d-inline" style={{color:this.chooseColor(maxTemp)}}>{maxTemp}</h2></h2>
                        <h2 className="d-inline mr-2 ">L<h2 className="d-inline" style={{color:this.chooseColor(minTemp)}}>{minTemp}</h2></h2>
                    </div>
                </div>
                

                <div>
                    <div className="d-flex mt-4 " style={{ overflowX: "scroll", height: "350px", whiteSpace: "nowrap", width: "100%"}}>
                        {showBars}
                    </div>
                </div>
            </div>
        )
    }
}
