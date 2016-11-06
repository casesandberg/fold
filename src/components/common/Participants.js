import React from 'react'
import _ from 'lodash'

import { Text } from 'react-universal'

export const PersonName = ({ account, participants, hideMe, firstNames }) => {
  const me = { email: account.email_address }
  const hasMe = !!_.filter(participants, me)
  const names = _.map(_.reject(participants, me), (person) => {
    return firstNames ? person.name.split(' ')[0] : person.name
  })

  return (
    <Text>
      { _.without(names, '').join(', ') + (hasMe && !hideMe ? ' and Me' : '')}
    </Text>
  )
}

PersonName.defaultProps = {
  separator: ' ',
}

export default PersonName
