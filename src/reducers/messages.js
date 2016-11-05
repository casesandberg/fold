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

const byId = (state = {}, action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS: {
      const messages = _.reduce(action.messages, (all, message) => {
        all[message.id] = message // eslint-disable-line no-param-reassign
        return all
      }, {})

      return { ...state, ...messages }
    }
    case SEND_SUCCESS:
      return { ...state, [action.message.id]: action.message }
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

const message = (state = {}, action) => {
  switch (action.type) {
    case EDIT_DRAFT: {
      return { ...state, ...action.message }
    }
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
  activeEmailDisplay: {},
  isComposeFocused: false,
}

const ui = (state = initialUIState, action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS:
      return { ...state, activeEmailDisplay: displayVisibility(action.messages) }
    case UNCOLLAPSE_ALL: {
      const display = _.reduce(state.activeEmailDisplay, (obj, dis, id) => {
        obj[id] = dis === 'open' ? 'open' : 'closed' // eslint-disable-line no-param-reassign
        return obj
      }, {})
      return { ...state, activeEmailDisplay: display }
    }
    case SEND_SUCCESS:
      return { ...state, activeEmailDisplay: { ...state.activeEmailDisplay, [action.message.id]: 'open' } }
    case OPEN_MESSAGE:
      return { ...state, activeEmailDisplay: { ...state.activeEmailDisplay, [action.id]: 'open' } }
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
  uncollapseAll: () => ({ type: UNCOLLAPSE_ALL }),
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
