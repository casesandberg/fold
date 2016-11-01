import React from 'react'

import { Box, Clickable, Text } from '../common'

export const SquashedMessages = ({ messages, onExpand }) => {
  return (
    <Clickable onClick={ onExpand }>
      <Box
        style={{
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
        }}
      >
        <Text style={{ fontSize: 15, color: '#aaa' }}>
          { messages ? `(${ messages.length }) ` : null }More Messages
        </Text>
      </Box>
    </Clickable>
  )
}

export default SquashedMessages
