import React from 'react'
import request from 'superagent'

class App extends React.Component {
  state = {
    QRCode: {
      apiURL: https://unitag-qr-code-generation.p.mashape.com/api,  
    },
  }
  
  componentDidMount () {
    this.getSpaceXData()
    this.getWeatherData()
  }

  getSpaceXData () {
    const {apiURL} = this.state.spaceX

    request.get(apiURL)
      .then(res => {
        this.setState({
          spaceX: {
            missions: res.body,
            latestMission: this.getLatestMission(res.body)
          }
        })
      })
  }

  getWeatherData () {
    const {apiURL, key, city} = this.state.weather

    request.get(apiURL + '?key=' + key + '&q=' + city)
      .then(res => {
        this.setState({
          weather: {
            ...this.state.weather,
            tempInC: res.body.current.temp_c + '°C'
          }
        })
      })
  }

  getLatestMission (missions) {
    return missions.find(mission => mission.upcoming)
  }

  render () {
    return (
      <React.Fragment>
        <h1>Next SpaceX mission:</h1>
        <p>{this.state.spaceX.latestMission.mission_name}</p>
        <br />
        <h1>Weather in {this.state.weather.city}:</h1>
        <p>{this.state.weather.tempInC}</p>
      </React.Fragment>
    )
  }
}

export default App