import _ from 'lodash'

export const GET_MESSAGES = 'THREADS/GET_MESSAGES'

export default function messages(state = [], action) {
  switch (action.type) {
    case GET_MESSAGES:
      return [...state, ...action.messages]
    default: return state
  }
}

export const actions = {
  getMessages: (accessToken, messageIDs) => (dispatch) => {
    return Promise.all(
      _.map(messageIDs, (messageID) => {
        return fetch(`https://api.nylas.com/messages/${ messageID }`, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${ btoa(`${ accessToken }:`) }`,
          },
        }).then(data => data.json())
      })
    ).then((m) => {
      dispatch({ type: GET_MESSAGES, messages: m })
    }).catch(err => console.log('err', err))
  },
}

export const getMessagesByThreadID = (state, id) => {
  return _.filter(state.messages, { thread_id: id })
}
