/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './src/store/configureStore'

import AppContainer from './src/containers/AppContainer'

export default class Mono extends Component { // eslint-disable-line
  render() { // eslint-disable-line
    return (
      <Provider store={ configureStore() }>
        <AppContainer />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Mono', () => Mono)
