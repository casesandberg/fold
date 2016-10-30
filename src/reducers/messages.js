import _ from 'lodash'
import { combineReducers } from 'redux'
import { NYLAS_API } from 'redux-nylas-middleware'

export const EDIT_DRAFT = 'MESSAGES/EDIT_DRAFT'

export const MESSAGES_REQUEST = 'MESSAGES/MESSAGES_REQUEST'
export const MESSAGES_SUCCESS = 'MESSAGES/MESSAGES_SUCCESS'
export const MESSAGES_FAILURE = 'MESSAGES/MESSAGES_FAILURE'

export const SEND_REQUEST = 'MESSAGES/SEND_REQUEST'
export const SEND_SUCCESS = 'MESSAGES/SEND_SUCCESS'
export const SEND_FAILURE = 'MESSAGES/SEND_FAILURE'

const byId = (state = {}, action) => {
  switch (action.type) {
    case MESSAGES_SUCCESS: {
      const messages = {}
      _.each(action.response, (message) => { messages[message.id] = message })
      return { ...state, ...messages }
    }
    case SEND_SUCCESS:
      return { ...state, [action.response.id]: action.response }
    default: return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case MESSAGES_SUCCESS:
      return _.union(state, _.map(action.response, 'id'))
    case SEND_SUCCESS:
      return [...state, action.response.id]
    default: return state
  }
}


const drafts = (state = {}, action) => {
  switch (action.type) {
    case EDIT_DRAFT: {
      const id = action.message.thread_id
      return { ...state, [id]: { ...state[id], ...action.message } }
    }
    case SEND_SUCCESS:
      return [...state, [action.response.thread_id]: {}]
    default: return state
  }
}

export default combineReducers({
  byId,
  allIds,
  drafts,
})

export const actions = {
  getMessages: messageIDs => ({
    [NYLAS_API]: {
      endpoints: _.map(messageIDs, id => (`messages/${ id }`)),
      types: [MESSAGES_REQUEST, MESSAGES_SUCCESS, MESSAGES_FAILURE],
    },
  }),

  reply: body => ({
    [NYLAS_API]: {
      endpoint: 'send',
      method: 'POST',
      types: [SEND_REQUEST, SEND_SUCCESS, SEND_FAILURE],
      body,
    },
  }),

  editDraft: message => ({ type: EDIT_DRAFT, message }),
}

const getAllMessages = state =>
  state.allIds.map(id => state.byId[id])

export const getMessagesByThreadID = (state, id) => {
  const allMessages = getAllMessages(state.messages)
  return _.filter(allMessages, { thread_id: id })
}
