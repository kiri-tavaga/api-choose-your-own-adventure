import React from 'react'
import request from 'superagent'

class App extends React.Component {
  state = {
    icon: null,
    temp: null,
    condition: null,
    humidity: null
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
            humidity: res.body.current.humidity,
            icon: res.body.current.condition.icon
          }
        )
      })
  }

  render () {
    return (
      <div>
        <h1>React development has begun!</h1>
        <h2>And hopefully there will be some API stuff below!</h2>
        <p>The current weather in {this.state.name} is {this.state.condition}.</p>
        <img src={'http:' + this.state.icon}></img>
        <p>The temparature is {this.state.temp} and the humidity is {this.state.humidity}.</p>
      </div>
    )
  }
}

export default App
