import _ from 'lodash'
import { NYLAS_API } from 'redux-nylas-middleware'

import * as MESSAGES from './messages'

export const SHOW_THREAD = 'THREADS/SHOW_THREAD'
export const MARK_THREAD_AS_READ = 'THREADS/MARK_THREAD_AS_READ'

export const ARCHIVE_REQUEST = 'THREADS/ARCHIVE_REQUEST'
export const ARCHIVE_SUCCESS = 'THREADS/ARCHIVE_SUCCESS'
export const ARCHIVE_FAILURE = 'THREADS/ARCHIVE_FAILURE'

export const GET_INBOX_REQUEST = 'THREADS/GET_INBOX_REQUEST'
export const GET_INBOX_SUCCESS = 'THREADS/GET_INBOX_SUCCESS'
export const GET_INBOX_FAILURE = 'THREADS/GET_INBOX_FAILURE'

export const initialState = {
  activeThreadID: '',
  threads: [],
}

export function thread(state = {}, action) {
  switch (action.type) {
    case MESSAGES.SEND_SUCCESS: {
      return { ...state, message_ids: [...state.message_ids, action.message.id] }
    }
    default: return state
  }
}

export default function threads(state = initialState, action) {
  switch (action.type) {
    case SHOW_THREAD:
      return { ...state, activeThreadID: action.id }
    case GET_INBOX_SUCCESS:
      return { ...state, threads: action.threads }
    case ARCHIVE_SUCCESS: {
      const index = _.findIndex(state.threads, thread => (thread.id === action.thread.id)) // eslint-disable-line no-shadow, max-len

      return {
        ...state,
        activeThreadID: state.threads[index + 1].id,
        threads: [
          ...state.threads.slice(0, index),
          ...state.threads.slice(index + 1),
        ],
      }
    }
    case MESSAGES.SEND_SUCCESS: {
      const index = _.findIndex(state.threads, thread => (thread.id === action.message.thread_id)) // eslint-disable-line no-shadow, max-len
      return {
        ...state,
        threads: [
          ...state.threads.slice(0, index),
          thread(state.threads[index], action),
          ...state.threads.slice(index + 1),
        ],
      }
    }
    default: return state
  }
}

export const actions = {
  getThreads: () => ({
    [NYLAS_API]: {
      endpoint: 'threads?in=inbox',
      types: [GET_INBOX_REQUEST, GET_INBOX_SUCCESS, GET_INBOX_FAILURE],
      model: 'threads',
    },
  }),

  archiveThread: (threadID, labels) => ({
    [NYLAS_API]: {
      endpoint: `threads/${ threadID }`,
      method: 'PUT',
      types: [ARCHIVE_REQUEST, ARCHIVE_SUCCESS, ARCHIVE_FAILURE],
      model: 'thread',
      body: {
        label_ids: _(labels).reject({ name: 'inbox' }).map('id'),
      },
    },
  }),

  showThread: id => ({ type: SHOW_THREAD, id }),
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

export const selectors = {
  getThreadByID: (state, id) => {
    return _.find(state.threads, { id }) || {}
  },

  getActiveThread: (state) => {
    return _.find(state.threads, { id: state.activeThreadID }) || {}
  },

  getActiveThreadID: (state) => {
    return state.activeThreadID
  },
}
