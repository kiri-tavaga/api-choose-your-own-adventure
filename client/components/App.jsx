import React from 'react'
import request from 'superagent'

class App extends React.Component {
  state = {
    city: null,
    icon: null,
    temp: null,
    condition: null,
    humidity: null,
    updated: null
  }

  componentDidMount () {
    this.getWeather()
  }

  getWeather () {
    request.get('http://api.apixu.com/v1/current.json?key=3beb485786ef46ad9f8223822181311&q=auckland')
      .then(res => {
        this.setState({
            temp: res.body.current.temp_c + '°C',
            city: res.body.location.name,
            condition: res.body.current.condition.text,
            humidity: res.body.current.humidity + "%",
            icon: res.body.current.condition.icon,
            updated: res.body.current.last_updated
          }
        )
      })
  }

  render () {
    return (
      <div>
        <h1>Current weather in {this.state.city}</h1>
        <h2>{this.state.condition}</h2>
        <img src={'http:' + this.state.icon}></img>
        <h3>The temparature is {this.state.temp} and the humidity is {this.state.humidity}.</h3>
        <p>Weather data last updated {this.state.updated}</p>
      </div>
    )
  }
}

export default App
