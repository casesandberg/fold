import React from 'react'
import reactCSS from 'reactcss'
import _ from 'lodash'

import { Box, Clickable, Text } from 'react-universal'
import ParticipantsContainer from '../../containers/ParticipantsContainer'

export const SquashedMessages = ({ messages, onExpand }) => {
  const styles = reactCSS({
    'default': {
      wrap: {
        background: '#fff',

        boxShadow: '0 2px 5px rgba(0,0,0,.1), 0 0 2px rgba(0,0,0,.1)',

        shadowOffset: {
          height: 2,
        },
        shadowRadius: 3,
        shadowColor: 'black',
        shadowOpacity: 0.2,

        borderRadius: 2,
        marginBottom: 1,
        height: 54,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      },
      label: {
        fontSize: 15,
        color: '#aaa',
      },
    },
  })

  const allPeople = _.map(messages, message => [...message.to, ...message.from, ...message.cc])
  const participants = _.uniqBy(_.flatten(allPeople), 'email')

  return (
    <Clickable onClick={ onExpand }>
      <Box style={ styles.wrap }>
        <Text style={ styles.label }>
          { messages ? `(${ messages.length }) ` : null }
          Messages Between <ParticipantsContainer participants={ participants } firstNames />
        </Text>
      </Box>
    </Clickable>
  )
}

export default SquashedMessages
