const tokenKey = 'access_token'
const defaults = {
  baseURL: 'https://api.nylas.com/',
  method: 'GET',
}

export const NYLAS_API = 'NYLAS/API'
export const SET_TOKEN = 'NYLAS/SET_TOKEN'
export const CLEAR_TOKEN = 'NYLAS/CLEAR_TOKEN'

function callApi({ endpoint, method, token, body, options }) {
  return fetch(options.baseURL + endpoint, {
    method: method || options.method,
    headers: options.headers || { 'Authorization': `Bearer ${ token }` },
    body: body ? JSON.stringify(body) : null,
  })
  .then(data => data.json())
}

export default (opts = {}) => () => next => (action) => {
  const apiAction = action[NYLAS_API]
  if (typeof apiAction === 'undefined') { return next(action) }

  const options = { ...defaults, ...opts }
  const token = localStorage.getItem(tokenKey) || null
  const { endpoint, endpoints, types, method, body } = apiAction
  const [REQUEST, SUCCESS, ERROR] = types

  next({ type: REQUEST })

  if (endpoints) {
    return Promise.all(endpoints.map(singleEndpoint =>
      callApi({ endpoint: singleEndpoint, method, options, token, body })
    ))
    .then(response => next({ type: SUCCESS, response }))
    .catch(error => next({ type: ERROR, error }))
  }

  return callApi({ endpoint, method, options, token, body })
  .then(response => next({ type: SUCCESS, response }))
  .catch(error => next({ type: ERROR, error }))
}

export const actions = {
  setToken: (token) => {
    localStorage.setItem(tokenKey, token)
    return ({ type: SET_TOKEN, token })
  },
  clearToken: () => {
    localStorage.removeItem(tokenKey)
    return ({ type: CLEAR_TOKEN, token: null })
  },
}
