import { combineReducers } from 'redux'

import app from './app'
import messages from './messages'
import threads from './threads'

const rootReducer = combineReducers({
  app,
  messages,
  threads,
})

export default rootReducer
