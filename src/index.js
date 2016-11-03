
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Match } from 'react-router'

import configureStore from './store/configureStore'

import TriageContainer from './containers/TriageContainer'
import Callback from './components/auth/Callback'
import Login from './components/auth/Login'
import MatchWhenAuthorized from './components/auth/MatchWhenAuthorized'

render(
  <Provider store={ configureStore() }>
    <BrowserRouter>
      <div>
        <MatchWhenAuthorized exactly pattern="/" component={ TriageContainer } />
        <Match pattern="/callback" component={ Callback } />
        <Match pattern="/login" component={ Login } />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
