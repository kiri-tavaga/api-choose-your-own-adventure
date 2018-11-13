import React from 'react'
import request from 'superagent'

class App extends React.Component{
  state = {
    weather: {
      apiURL: 'http://api.apixu.com/v1/current.json',
      key: 'e136d99fd75a4bf49b0223551181311 ',
      city: 'Titirangi',
      temperature: null,
      condition: ''
    },
    news: {
      newsURL: '',
      newsKey: '855e439c689c484b9818556631826045',
    }
  }

  componentDidMount() {
    this.getWeather()
    this.getNews()
  }

    getWeather() {
      const {apiURL, key, city} = this.state.weather
      const url = apiURL + '?key=' + key + '&q=' + city
      request.get(url)
      .then(res => {
      this.setState({
        weather: {
          city: this.state.weather.city,
          temperature: res.body.current.temp_c + ' degrees celcius',
          condition: res.body.current.condition.text
        }
      })
    })
  }

  getNews() {
    var newsUrl = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=855e439c689c484b9818556631826045'
    request.get(newsUrl)
    .then(res => {
      console.log(response.json())
    })   
  }


  render() {
  return (
    <React.Fragment>
      <h1>This is the weather in { this.state.weather.city} </h1>
      <p>{this.state.weather.temperature}</p>
      <p>{this.state.weather.condition}</p>
    </React.Fragment>
  )}
}

export default App

