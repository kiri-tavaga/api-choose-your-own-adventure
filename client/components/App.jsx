import React from 'react'
import request from 'superagent'

class App extends React.Component {
  //Note to self: cannot declare properties for objects that do not exist yet.
  state = {
    weather: {
      apiK: '6632adbe463749a3ad3221126181311',
      // url: 'http://api.apixu.com/v1/current.json?key=' + this.state.weather.apiK + '&q=' + this.state.network.location,
      urlF: 'http://api.apixu.com/v1/forecast.json?key=6632adbe463749a3ad3221126181311&q=Paris',
      location: '',
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
   this.callWeather()
  }

  findIP() {
    request
      .get(this.state.network.urlIP)
      .then( res => {
        this.setState = ({
          network: {
            ip: res.ip,
            urlLocation: 'https://geo.ipify.org/api/v1?apiKey='+ this.state.network.apiK + '&ipAddress=' + this.state.network.ip
          }
        })
      .get(this.state.network.urlLocation)
      .then( res => {
        this.setState({
          network:  {
            location: res.body.location.city
          },
          weather: {
            url: 'http://api.apixu.com/v1/current.json?key=' + this.state.weather.apiK + '&q=' + this.state.network.location,
          }
        })
      })
      })
  }

  callWeather() {
    console.log('weather has been called')
    request
    .get(this.state.weather.url)
    .then(res => {
      this.setState({
        weather: { 
          location: res.body.location.name,
          tempInC: res.body.current.temp_c,
          temptomorrow: res.body.forecast.forecastday['0'].day.maxtemp_c,
          mintempTomorrow: res.body.forecast.forecastday['0'].day.mintemp_c
        }
      })
    })
  }


  render(){
  return (
    <React.Fragment>
      <h1>Hello API!</h1>
        <h5>my old friend</h5>
      <div>
        <p>The temp is : {this.state.weather.tempInC}</p>
        <p>Tomorrow's temp is : {this.state.weather.temptomorrow}</p>
        <p>Tomorrow's minimum temp is : {this.state.weather.mintempTomorrow}</p>
        <p>The city I am located it : {this.state.network.location}</p>
        <p>IP  : {this.state.network.ip}</p>
        



      </div>
    </React.Fragment>
    
  )
  }
}
export default App

