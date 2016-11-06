import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { MemoryRouter, Match } from 'react-router'
import configureStore from './src/store/configureStore'

import TriageContainer from './src/containers/TriageContainer'
import Callback from './src/components/auth/Callback'
import Login from './src/components/auth/Login'
import MatchWhenAuthorized from './src/components/auth/MatchWhenAuthorized'

import { Box } from './src/components/common'

export default class Mono extends Component { // eslint-disable-line
  render() { // eslint-disable-line
    return (
      <Provider store={ configureStore() }>
        <MemoryRouter>
          <Box>
            <MatchWhenAuthorized exactly pattern="/" component={ TriageContainer } />
            <Match pattern="/callback" component={ Callback } />
            <Match pattern="/login" component={ Login } />
          </Box>
        </MemoryRouter>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Mono', () => Mono)
