import * as THREADS from './threads'
import * as NYLAS from '../../redux-nylas-middleware'


export const INIT = 'APP/INIT'

export const initialState = {
  accessToken: '',
  activeThreadID: '',
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case THREADS.SHOW_THREAD:
      return { ...state, activeThreadID: action.id }
    case NYLAS.SET_TOKEN:
      return { ...state, accessToken: action.token }
    default: return state
  }
}

export const actions = {
  initUser: (accessToken) => {
    localStorage.setItem('access_token', accessToken)
    return { type: INIT, accessToken }
  },
}
