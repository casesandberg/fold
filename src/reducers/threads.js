import _ from 'lodash'
import { NYLAS_API } from 'redux-nylas-middleware'

import * as MESSAGES from './messages'

export const GET_THREADS = 'THREADS/GET_THREADS'
export const SHOW_THREAD = 'THREADS/SHOW_THREAD'

export const REMOVE_REQUEST = 'THREADS/REMOVE_REQUEST'
export const REMOVE_SUCCESS = 'THREADS/REMOVE_SUCCESS'
export const REMOVE_FAILURE = 'THREADS/REMOVE_FAILURE'

export const THREADS_REQUEST = 'THREADS/THREADS_REQUEST'
export const THREADS_SUCCESS = 'THREADS/THREADS_SUCCESS'
export const THREADS_FAILURE = 'THREADS/THREADS_FAILURE'

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
    case THREADS_SUCCESS:
      return { ...state, threads: action.threads }
    case REMOVE_SUCCESS: {
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
      types: [THREADS_REQUEST, THREADS_SUCCESS, THREADS_FAILURE],
      model: 'threads',
    },
  }),

  archiveThread: (threadID, labels) => ({
    [NYLAS_API]: {
      endpoint: `threads/${ threadID }`,
      method: 'PUT',
      types: [REMOVE_REQUEST, REMOVE_SUCCESS, REMOVE_FAILURE],
      model: 'thread',
      body: {
        label_ids: _(labels).reject({ name: 'inbox' }).map('id'),
      },
    },
  }),

  showThread: id => ({ type: SHOW_THREAD, id }),
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
