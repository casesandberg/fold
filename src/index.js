import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import { AuthComponents, MatchWhenAuthorized } from 'react-universal-auth'
import configureStore from './store/configureStore'

import TriageContainer from './containers/TriageContainer'

render(
  <Provider store={ configureStore() }>
    <BrowserRouter>
      <div>
        <MatchWhenAuthorized exactly pattern="/" component={ TriageContainer } />
        { AuthComponents }
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
