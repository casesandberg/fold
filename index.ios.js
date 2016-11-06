import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { AuthComponents, MatchWhenAuthorized } from 'react-universal-auth'
import { Box } from 'react-universal'
import configureStore from './src/store/configureStore'

import TriageContainer from './src/containers/TriageContainer'

export default class Mono extends Component { // eslint-disable-line
  render() { // eslint-disable-line
    return (
      <Provider store={ configureStore() }>
        <MemoryRouter>
          <Box>
            <MatchWhenAuthorized exactly pattern="/" component={ TriageContainer } />
            { AuthComponents }
          </Box>
        </MemoryRouter>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Mono', () => Mono)
