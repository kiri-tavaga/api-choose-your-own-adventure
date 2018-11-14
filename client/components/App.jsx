import React from 'react'
import request from 'superagent'

class App extends React.Component {
  //Note to self: cannot declare properties for objects that do not exist yet.
  state = {
    weather: {
      apiK: '6632adbe463749a3ad3221126181311',
      // url: 'http://api.apixu.com/v1/current.json?key=' + this.state.weather.apiK + '&q=' + this.state.network.location,
      urlF: '',
      tempInC: null,
      temptomorrow: null,
      mintempTomorrow: null
      },
    network: {
      apiK: 'at_LGwxqmdmYjaoalUDESDzJZAcCEyjy',
      urlIP: 'https://api.ipify.org?format=json',
      // urlLocation: 'https://geo.ipify.org/api/v1?apiKey='+ this.state.network.apiK + '&ipAddress=' + this.state.network.ip ,
      urlLocation : '',
      ip: '',
      location: ''
      }
    }
  componentDidMount() {
   this.findIP()
  }

  findIP() {
    request
      .get(this.state.network.urlIP)
      .then( res => {
        this.setState({
          network: {
            ip: res.body.ip,
            urlLocation: 'https://geo.ipify.org/api/v1?apiKey='+ this.state.network.apiK + '&ipAddress=' + res.body.ip
          }
        })

    request
      .get(this.state.network.urlLocation)
      .then( res => {
        this.setState({
          // ...this.state,
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
          // 
          network:  {
            location: res.body.location.city,
            ip: this.state.network.ip
          },
          weather: {
            urlF: `http://api.apixu.com/v1/forecast.json?key=${this.state.weather.apiK}&q=${res.body.location.city}`,
            // urlF: 'http://api.apixu.com/v1/forecast.json?key=6632adbe463749a3ad3221126181311&q=Paris'
          }
        })
        this.callWeather()

      })
    })
  }

  callWeather() {
    // console.log('weather has been called'+ this.state.weather.urlF)
    let weatherURL = this.state.weather.urlF
    request
    .get(weatherURL)
    .then(res => {
      this.setState({
        weather: { 
          tempInC: res.body.current.temp_c,
          temptomorrow: res.body.forecast.forecastday['0'].day.maxtemp_c,
          mintempTomorrow: res.body.forecast.forecastday['0'].day.mintemp_c
          }
        //   ,
        //   network:  {
        //     location: this.state.network.location,
        //     apiK: this.state.network.apiK,
        //     urlIP: this.state.network.urlIP,
        //     urlLocation : this.state.network.urlLocation,
        //     ip: this.state.network.ip
        // }
      })
    })
  }


  render(){
  return (
    <React.Fragment>
      <h1>Hello API!</h1>
        <h5>my old friend</h5>
      <div>
        <p>The temp is : {this.state.weather.tempInC} °C</p>
        <p>Tomorrow's temp is : {this.state.weather.temptomorrow} °C</p>
        <p>Tomorrow's minimum temp is : {this.state.weather.mintempTomorrow} °C</p>
        <p>The city I am located it : {this.state.network.location}</p>
        <p>IP  : {this.state.network.ip}</p>
      </div>
    </React.Fragment>
    
  )
  }
}
export default App

