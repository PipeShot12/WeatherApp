import './App.css';
import Nav from "./Nav/Nav";
import Header from "./Header/Header"
import Current from "./Current/Current"
import Today from "./Today/Today"
import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempData: "",
      nameCounty: "",
      imageCountry: ""
    }
  }
  getData = (tempData, countryInput, photo) => {
    if (tempData) {
      this.setState({ tempData})
    }
    if (countryInput) {
      this.setState({ nameCounty: countryInput })
    }
    if (photo) {
      this.setState({ imageCountry: photo })
    }

  }

  render() {
    return (
      <div>
        <div className="container-fluid my-sm-4 my-lg-5">
          <div id="app" className='col-lg-11 col-12 mx-auto'>
            <div className="row">
              <Nav></Nav>
              <div className="col-lg-11 col-12" >
                <div className="row">
                  <Header getData={this.getData}></Header>
                  <Current photoCountry={this.state.imageCountry} tempData={this.state.tempData} nameCounty={this.state.nameCounty}></Current>
                  <Today tempData={this.state.tempData}></Today>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


