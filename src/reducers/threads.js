import _ from 'lodash'
import { NYLAS_API } from 'redux-nylas-middleware'
import { combineReducers } from 'redux'

import * as MESSAGES from './messages'

export const SHOW_THREAD = 'THREADS/SHOW_THREAD'
export const SNOOZE_THREAD = 'THREADS/SNOOZE_THREAD'
export const MARK_THREAD_AS_READ = 'THREADS/MARK_THREAD_AS_READ'

export const ARCHIVE_REQUEST = 'THREADS/ARCHIVE_REQUEST'
export const ARCHIVE_SUCCESS = 'THREADS/ARCHIVE_SUCCESS'
export const ARCHIVE_FAILURE = 'THREADS/ARCHIVE_FAILURE'

export const GET_INBOX_REQUEST = 'THREADS/GET_INBOX_REQUEST'
export const GET_INBOX_SUCCESS = 'THREADS/GET_INBOX_SUCCESS'
export const GET_INBOX_FAILURE = 'THREADS/GET_INBOX_FAILURE'


export function thread(state = {}, action) {
  switch (action.type) {
    case MESSAGES.SEND_SUCCESS:
      return { ...state, message_ids: [...state.message_ids, action.message.id] }
    case MARK_THREAD_AS_READ:
      return { ...state, unread: false }
    default: return state
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case GET_INBOX_SUCCESS: {
      const threads = _.reduce(action.threads, (all, message) => {
        all[message.id] = message // eslint-disable-line no-param-reassign
        return all
      }, {})

      return { ...state, ...threads }
    }
    case ARCHIVE_SUCCESS:
      return _.omit(state, action.thread.id)
    case MARK_THREAD_AS_READ:
      return {
        ...state,
        [action.thread.id]: thread(state[action.thread.id], action),
      }
    case MESSAGES.SEND_SUCCESS:
      return {
        ...state,
        [action.message.thread_id]: thread(state[action.message.thread_id], action),
      }
    default: return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case GET_INBOX_SUCCESS:
      return _.union(state, _.map(action.threads, 'id'))
    case ARCHIVE_SUCCESS: {
      return _.without(state, action.thread.id)
    }
    default: return state
  }
}

const initialUIState = {
  activeThreadID: '',
}

const ui = (state = initialUIState, action) => {
  switch (action.type) {
    case SHOW_THREAD:
      return { ...state, activeThreadID: action.id }
    case ARCHIVE_SUCCESS:
      return { ...state, activeThreadID: action.nextThreadID }
    default: return state
  }
}

export default combineReducers({
  byId,
  allIds,
  ui,
})

export const actions = {
  getThreads: () => ({
    [NYLAS_API]: {
      endpoint: 'threads?in=inbox',
      types: [GET_INBOX_REQUEST, GET_INBOX_SUCCESS, GET_INBOX_FAILURE],
      model: 'threads',
    },
  }),

  archiveThread: (threadID, labels, nextThreadID) => ({
    [NYLAS_API]: {
      endpoint: `threads/${ threadID }`,
      method: 'PUT',
      types: [ARCHIVE_REQUEST, ARCHIVE_SUCCESS, ARCHIVE_FAILURE],
      model: 'thread',
      passthrough: {
        nextThreadID,
      },
      body: {
        label_ids: _(labels).reject({ name: 'inbox' }).map('id'),
      },
    },
  }),

  showThread: id => ({ type: SHOW_THREAD, id }),
  snoozeThread: id => ({ type: SNOOZE_THREAD, id }),
  markThreadAsRead: id => ({
    [NYLAS_API]: {
      endpoint: `threads/${ id }`,
      method: 'PUT',
      types: [null, MARK_THREAD_AS_READ, null],
      model: 'thread',
      body: {
        unread: false,
      },
    },
  }),
}

const getAllThreads = state =>
  state.allIds.map(id => state.byId[id])

export const selectors = {
  getInbox: (state) => {
    return getAllThreads(state)
  },

  getNextThreadID: (state, currentID) => {
    const index = _.indexOf(state.allIds, currentID)
    return state.allIds[index + 1]
  },

  getThreadByID: (state, id) => {
    const threads = getAllThreads(state)
    return _.find(threads, { id }) || {}
  },

  getActiveThread: (state) => {
    const threads = getAllThreads(state)
    return _.find(threads, { id: selectors.getActiveThreadID(state) }) || {}
  },

  getActiveThreadID: (state) => {
    return state.ui.activeThreadID
  },
}
