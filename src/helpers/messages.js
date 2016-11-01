/* eslint-disable no-param-reassign */
import _ from 'lodash'

export const displayVisibility = (messages) => {
  const openClosed = _.map(messages, (message, i) => {
    if (i === messages.length - 1) {
      return 'open'
    }
    return message.unread ? 'open' : 'closed'
  })

  const visibility = messages.length > 5 ? (
    _.map(openClosed, (state, i) => {
      return openClosed[i - 1] === 'closed' && openClosed[i + 1] === 'closed' ? 'collapsed' : state
    })
  ) : openClosed

  return _.reduce(messages, (obj, message, i) => {
    obj[message.id] = visibility[i]
    return obj
  }, {})
}
