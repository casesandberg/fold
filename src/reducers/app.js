export const INIT = 'APP/INIT'

export const initialState = {
  accessToken: '',
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return { ...state, accessToken: action.accessToken }
    default: return state
  }
}

export const actions = {
  initUser: accessToken => ({ type: INIT, accessToken }),
}
