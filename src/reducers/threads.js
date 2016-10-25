import _ from 'lodash'

export const GET_THREADS = 'THREADS/GET_THREADS'
export const REMOVE_THREAD = 'THREADS/REMOVE_THREAD'

export default function threads(state = [], action) {
  const index = _.findIndex(state, thread => (thread.id === action.id))

  switch (action.type) {
    case GET_THREADS:
      return action.threads
    case REMOVE_THREAD:
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1),
      ]
    default: return state
  }
}

export const actions = {
  getThreads: accessToken => (dispatch) => {
    return fetch('https://api.nylas.com/threads?in=inbox', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${ btoa(`${ accessToken }:`) }`,
      },
    }).then(data => data.json()).then((t) => {
      dispatch({ type: GET_THREADS, threads: t })
    }).catch((err) => {
      console.log('err', err) // eslint-disable-line no-console
    })
  },
  archiveThread: (accessToken, threadID, labels) => (dispatch) => {
    const newLabels = _.map(_.filter(labels, label => (label.name !== 'inbox')), 'id')
    return fetch(`https://api.nylas.com/threads/${ threadID }`, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${ btoa(`${ accessToken }:`) }`,
      },
      body: JSON.stringify({
        label_ids: newLabels,
      }),
    }).then(data => data.json()).then(({ id }) => {
      dispatch({ type: REMOVE_THREAD, id })
    }).catch((err) => {
      console.log('err', err) // eslint-disable-line no-console
    })
  },
}
