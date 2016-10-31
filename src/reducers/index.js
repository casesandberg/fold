import { combineReducers } from 'redux'
import { scopeStateToSelectors } from '../helpers/redux'

import app from './app'
import messages, { selectors as messagesSelectors } from './messages'
import threads, { selectors as threadsSelectors } from './threads'

const rootReducer = combineReducers({
  app,
  messages,
  threads,
})

export default rootReducer

export const selectors = scopeStateToSelectors({
  messages: messagesSelectors,
  threads: threadsSelectors,
})
