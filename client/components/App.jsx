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
      newsURL: 'https://newsapi.org/v2/top-headlines',
      newsKey: '855e439c689c484b9818556631826045',
      title: '',
      description: '',
      author: '',
      content: '',
      agent: ''
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
    var newsUrl1 = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=855e439c689c484b9818556631826045'
    request.get(newsUrl1)
    .then(res => {
      this.setState({
        news: {
          title: res.body.articles[0].title,
          description: res.body.articles[0].description,
          author: res.body.articles[0].author,
          agent: res.body.articles[0].source.name,
          content: res.body.articles[0].content
          
        }
      })
    })   
  }


  render() {
  return (
    <React.Fragment>
      <h1>This is the weather in { this.state.weather.city} </h1>
      <p>{this.state.weather.temperature}</p>
      <p>{this.state.weather.condition}</p>
      <h1>The top news for the day is: </h1>
      <h4>{this.state.news.title}</h4>
      <h5>{this.state.news.description}</h5>
      <p>Written by {this.state.news.author} from {this.state.news.agent}</p>
      <p>{this.state.news.content}</p>
    </React.Fragment>
  )}
}

export default App

