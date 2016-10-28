import * as THREADS from './threads'

export const INIT = 'APP/INIT'

export const initialState = {
  accessToken: '',
  activeThreadID: '',
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case THREADS.SHOW_THREAD:
      return { ...state, activeThreadID: action.id }
    case INIT:
      return { ...state, accessToken: action.accessToken }
    default: return state
  }
}

export const actions = {
  initUser: (accessToken) => {
    localStorage.setItem('access_token', accessToken)
    return { type: INIT, accessToken }
  },
}
