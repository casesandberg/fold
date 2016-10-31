import React from 'react'
import { getFromURI, objToString } from '../helpers/uri'

import TriageContainer from '../containers/TriageContainer'

export class App extends React.Component {
  componentDidMount() {
    // this.props.setToken(getFromURI('access_token'))
  }
  render() {
    const { isAuthed } = this.props

    const nylas = {
      client_id: '7vv3n35607oxmk8ztn1jpwghc',
      response_type: 'token',
      scope: 'email',
      redirect_uri: 'http://localhost:8517',
    }

    return !isAuthed ? (
      <a href={ `https://api.nylas.com/oauth/authorize?${ objToString(nylas) }` }>
        Login
      </a>
    ) : (
      <TriageContainer />
    )
  }
}

export default App
