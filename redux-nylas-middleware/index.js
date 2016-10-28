import defaults from './defaults'

export const NYLAS_API = 'NYLAS_API'

export default (opts = {}) => () => next => (action) => {
  const options = { ...defaults, ...opts }
  const apiAction = action[NYLAS_API]
  if (typeof apiAction === 'undefined') { return next(action) }

  const token = localStorage.getItem('access_token') || null
  const { endpoint, types, method, body } = apiAction
  const [REQUEST, SUCCESS, ERROR] = types

  next({ type: REQUEST })
  return fetch(options.baseURL + endpoint, {
    method: method || options.method,
    headers: { 'Authorization': `Bearer ${ token }` },
    body: body ? JSON.stringify(body) : null,
  }).then(data => data.json()).then((response) => {
    next({ type: SUCCESS, response })
  }).catch((err) => {
    next({ type: ERROR, error: err.message || 'There was an error.', err })
  })
}
