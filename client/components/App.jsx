import { React, Component } from 'react'
import request from 'superagent'

export default class App extends Component {
  state = {
    message: ''
  }

  componentDidMount() {
    request
      .get('https://lakerolmaker-insult-generator-v1.p.mashape.com/')
      .set(
        'X-Mashape-Authorization',
        '9fphVRr8qFmshJBbwNojxXFn6pPfp12f3Jjjsn5ZszP5F62C3D'
      )
      .set('Accept: text/plain')
      .then(res => {
        this.setState({ message: res.body.message }).catch(err => {
          this.setState({ message: err.message })
        })
      })
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    )
  }
}
