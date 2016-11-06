import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { AuthComponents, MatchWhenAuthorized } from 'react-universal-auth'
import configureStore from './src/store/configureStore'

import TriageContainer from './src/containers/TriageContainer'

import { Box } from './src/components/common'

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
