
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import AppContainer from './containers/AppContainer'

render(
  <Provider store={ configureStore() }>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
