import _ from 'lodash'
import { NYLAS_API } from 'redux-nylas-middleware'

export const GET_THREADS = 'THREADS/GET_THREADS'
export const SHOW_THREAD = 'THREADS/SHOW_THREAD'

export const REMOVE_REQUEST = 'THREADS/REMOVE_REQUEST'
export const REMOVE_SUCCESS = 'THREADS/REMOVE_SUCCESS'
export const REMOVE_FAILURE = 'THREADS/REMOVE_FAILURE'

export const THREADS_REQUEST = 'THREADS/THREADS_REQUEST'
export const THREADS_SUCCESS = 'THREADS/THREADS_SUCCESS'
export const THREADS_FAILURE = 'THREADS/THREADS_FAILURE'

export default function threads(state = [], action) {
  switch (action.type) {
    case THREADS_SUCCESS:
      return action.response
    case REMOVE_SUCCESS: {
      const index = _.findIndex(state, thread => (thread.id === action.response.id))

      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ]
    }
    default: return state
  }
}

export const actions = {
  getThreads: () => ({
    [NYLAS_API]: {
      endpoint: 'threads?in=inbox',
      types: [THREADS_REQUEST, THREADS_SUCCESS, THREADS_FAILURE],
    },
  }),
  archiveThread: (threadID, labels) => ({
    [NYLAS_API]: {
      endpoint: `threads/${ threadID }`,
      method: 'PUT',
      types: [REMOVE_REQUEST, REMOVE_SUCCESS, REMOVE_FAILURE],
      body: {
        label_ids: _(labels).reject({ name: 'inbox' }).map('id'),
      },
    },
  }),

  showThread: id => ({ type: SHOW_THREAD, id }),
}

export const getThreadByID = (state, id) => {
  return _.filter(state.threads, { id })[0]
}
