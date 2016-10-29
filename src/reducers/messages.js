import _ from 'lodash'
import { combineReducers } from 'redux'
import { NYLAS_API } from 'redux-nylas-middleware'

export const MESSAGES_REQUEST = 'THREADS/MESSAGES_REQUEST'
export const MESSAGES_SUCCESS = 'THREADS/MESSAGES_SUCCESS'
export const MESSAGES_FAILURE = 'THREADS/MESSAGES_FAILURE'

const byId = (state = {}, action) => {
  switch (action.type) {
    case MESSAGES_SUCCESS: {
      const messages = {}
      _.each(action.response, (message) => { messages[message.id] = message })
      return { ...state, ...messages }
    }
    default: return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case MESSAGES_SUCCESS:
      return _.union(state, _.map(action.response, 'id'))
    default: return state
  }
}

export default combineReducers({
  byId,
  allIds,
})

export const actions = {
  getMessages: messageIDs => ({
    [NYLAS_API]: {
      endpoints: _.map(messageIDs, id => (`messages/${ id }`)),
      types: [MESSAGES_REQUEST, MESSAGES_SUCCESS, MESSAGES_FAILURE],
    },
  }),
}

const getAllMessages = state =>
  state.allIds.map(id => state.byId[id])

export const getMessagesByThreadID = (state, id) => {
  const allMessages = getAllMessages(state.messages)
  return _.filter(allMessages, { thread_id: id })
}
