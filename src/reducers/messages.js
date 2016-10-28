import _ from 'lodash'
import { combineReducers } from 'redux'

export const GET_MESSAGES = 'THREADS/GET_MESSAGES'

const byId = (state = {}, action) => {
  switch (action.type) {
    case GET_MESSAGES: {
      const messages = {}
      _.each(action.messages, (message) => { messages[message.id] = message })
      return { ...state, ...messages }
    }
    default: return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return _.union(state, _.map(action.messages, 'id'))
    default: return state
  }
}

export default combineReducers({
  byId,
  allIds,
})

export const actions = {
  getMessages: (accessToken, messageIDs) => (dispatch) => {
    return Promise.all(
      _.map(messageIDs, (messageID) => {
        return fetch(`https://api.nylas.com/messages/${ messageID }`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${ accessToken }`,
          },
        }).then(data => data.json())
      })
    ).then((m) => {
      dispatch({ type: GET_MESSAGES, messages: m })
    }).catch(err => console.log('err', err)) // eslint-disable-line
  },
}

const getAllMessages = state =>
  state.allIds.map(id => state.byId[id])

export const getMessagesByThreadID = (state, id) => {
  const allMessages = getAllMessages(state.messages)
  return _.filter(allMessages, { thread_id: id })
}
