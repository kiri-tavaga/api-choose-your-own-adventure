import React from 'react'
import request from 'superagent'

export default class App extends React.Component {
  state = {
    source: '',
    translation: ''
  }

  componentDidMount() {
    request
      .get('https://eda-te-reo.herokuapp.com/api/proverbs')
      .then(res => {
        this.setState({ source: res.body.source })
        this.setState({ translation: res.body.translation})
      })
      .catch(err => {
        this.setState({ message: err.message })
      })
  }

  render() {
    return (
      <div>
        <h1>Māori Proverb Translator</h1>
        <h2>{this.state.source}</h2>
        <p>{this.state.translation}</p>
      </div>
    )
  }
}
