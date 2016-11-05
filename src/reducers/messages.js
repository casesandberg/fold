/* eslint-disable no-param-reassign */
import _ from 'lodash'
import { combineReducers } from 'redux'
import { NYLAS_API } from 'redux-nylas-middleware'
import { displayVisibility } from '../helpers/messages'

export const EDIT_DRAFT = 'MESSAGES/EDIT_DRAFT'
export const UNCOLLAPSE_ALL = 'MESSAGES/UNCOLLAPSE_ALL'
export const OPEN_MESSAGE = 'MESSAGES/OPEN_MESSAGE'
export const FOCUS_REPLY_BAR = 'MESSAGES/FOCUS_REPLY_BAR'
export const BLUR_REPLY_BAR = 'MESSAGES/BLUR_REPLY_BAR'

export const GET_MESSAGES_REQUEST = 'MESSAGES/GET_MESSAGES_REQUEST'
export const GET_MESSAGES_SUCCESS = 'MESSAGES/GET_MESSAGES_SUCCESS'
export const GET_MESSAGES_FAILURE = 'MESSAGES/GET_MESSAGES_FAILURE'

export const SEND_REQUEST = 'MESSAGES/SEND_REQUEST'
export const SEND_SUCCESS = 'MESSAGES/SEND_SUCCESS'
export const SEND_FAILURE = 'MESSAGES/SEND_FAILURE'

const message = (state = {}, action) => {
  switch (action.type) {
    case EDIT_DRAFT: {
      return { ...state, ...action.message }
    }
    case OPEN_MESSAGE:
    case SEND_SUCCESS:
      return { ...state, visibility: 'open' }
    case UNCOLLAPSE_ALL:
      return { ...state, visibility: 'closed' }
    default: return state
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS: {
      const visibility = displayVisibility(action.messages)
      const messages = _.reduce(action.messages, (all, m) => {
        all[m.id] = { ...m, visibility: visibility[m.id] }
        return all
      }, {})

      return { ...state, ...messages }
    }
    case UNCOLLAPSE_ALL: {
      return {
        ...state,
        ..._.reduce(action.ids, (all, id) => {
          all[id] = message(state[id], action)
          return all
        }, {}),
      }
    }
    case OPEN_MESSAGE:
      return { ...state, [action.id]: message(state[action.id], action) }
    case SEND_SUCCESS:
      return { ...state, [action.message.id]: message(action.message, action) }
    default: return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS:
      return _.union(state, _.map(action.messages, 'id'))
    case SEND_SUCCESS:
      return [...state, action.message.id]
    default: return state
  }
}

const drafts = (state = {}, action) => {
  switch (action.type) {
    case EDIT_DRAFT: {
      const id = action.message.thread_id
      return { ...state, [id]: message(state[id], action) }
    }
    case SEND_SUCCESS:
      return _.omit(state, action.message.thread_id)
    default: return state
  }
}

const initialUIState = {
  isComposeFocused: false,
}

const ui = (state = initialUIState, action) => {
  switch (action.type) {
    case FOCUS_REPLY_BAR:
      return { ...state, isComposeFocused: true }
    case BLUR_REPLY_BAR:
      return { ...state, isComposeFocused: false }
    default: return state
  }
}

export default combineReducers({
  byId,
  allIds,
  drafts,
  ui,
})

export const actions = {
  getMessages: messageIDs => ({
    [NYLAS_API]: {
      endpoints: _.map(messageIDs, id => (`messages/${ id }`)),
      types: [GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS, GET_MESSAGES_FAILURE],
      model: 'messages',
    },
  }),

  reply: body => ({
    [NYLAS_API]: {
      endpoint: 'send',
      method: 'POST',
      types: [SEND_REQUEST, SEND_SUCCESS, SEND_FAILURE],
      model: 'message',
      body,
    },
  }),

  editDraft: message => ({ type: EDIT_DRAFT, message }), // eslint-disable-line no-shadow
  uncollapseAll: ids => ({ type: UNCOLLAPSE_ALL, ids }),
  openMessage: id => ({ type: OPEN_MESSAGE, id }),
  focusReply: () => ({ type: FOCUS_REPLY_BAR }),
  blurReply: () => ({ type: BLUR_REPLY_BAR }),
}

const getAllMessages = state =>
  state.allIds.map(id => state.byId[id])

export const selectors = {
  getMessageByID: (state, id) => {
    return state.byId[id]
  },
  getMessagesByThreadID: (state, id) => {
    const allMessages = getAllMessages(state)
    return _.filter(allMessages, { thread_id: id }) || []
  },
  getDraftByID: (state, id) => {
    return state.drafts[id]
  },
  getComposeFocus: (state) => {
    return state.ui.isComposeFocused
  },
}
