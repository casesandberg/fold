import * as NYLAS from 'redux-nylas-middleware'

export const TOGGLE_SIDEBAR = 'APP/TOGGLE_SIDEBAR'

export const initialState = {
  accessToken: '',
  isSidebarVisible: false,
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case NYLAS.SET_TOKEN:
      return { ...state, accessToken: action.token }
    case TOGGLE_SIDEBAR:
      return { ...state, isSidebarVisible: !state.isSidebarVisible }
    default: return state
  }
}

export const actions = {
  toggleSidebar: () => ({ type: TOGGLE_SIDEBAR }),
}

export const selectors = {
  getSidebarVisibility: (state) => {
    return state.isSidebarVisible
  },
}
