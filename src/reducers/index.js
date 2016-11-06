import { combineReducers } from 'redux'
import { scopeStateToSelectors } from 'redux-selector'

import app, { selectors as appSelectors } from './app'
import messages, { selectors as messagesSelectors } from './messages'
import threads, { selectors as threadsSelectors } from './threads'

const rootReducer = combineReducers({
  app,
  messages,
  threads,
})

export default rootReducer

export const selectors = scopeStateToSelectors({
  app: appSelectors,
  messages: messagesSelectors,
  threads: threadsSelectors,
})
