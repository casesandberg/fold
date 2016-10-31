import _ from 'lodash'

export const getFromURI = (param) => {
  if (typeof location === 'undefined' || !location.search) { return undefined }
  const params = {}
  const parts = location.search.substring(1).split('&')

  _.each(parts, (part) => {
    const [key, value] = part.split('=')
    params[key] = value
  })

  return params[param]
}

export const objToString = (obj) => {
  return _.toPairs(obj).map(pair => pair.join('=')).join('&')
}
