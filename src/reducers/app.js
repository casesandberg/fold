import * as NYLAS from 'redux-nylas-middleware'

export const TOGGLE_SIDEBAR = 'APP/TOGGLE_SIDEBAR'
export const GET_ACCOUNT_SUCCESS = 'APP/GET_ACCOUNT_SUCCESS'

export const initialState = {
  accessToken: '',
  isSidebarVisible: false,
  account: {},
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case NYLAS.SET_TOKEN:
      return { ...state, accessToken: action.token }
    case TOGGLE_SIDEBAR:
      return { ...state, isSidebarVisible: !state.isSidebarVisible }
    case GET_ACCOUNT_SUCCESS:
      return { ...state, account: action.account }
    default: return state
  }
}

export const actions = {
  toggleSidebar: () => ({ type: TOGGLE_SIDEBAR }),

  getAccount: () => ({
    [NYLAS.NYLAS_API]: {
      endpoint: 'account',
      types: [null, GET_ACCOUNT_SUCCESS, null],
      model: 'account',
    },
  }),
}

export const selectors = {
  getSidebarVisibility: (state) => {
    return state.isSidebarVisible
  },
  getAccount: (state) => {
    return state.account
  },
}
