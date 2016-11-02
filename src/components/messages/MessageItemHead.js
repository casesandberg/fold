import React from 'react'
import reactCSS from 'reactcss'
import moment from 'moment-twitter'

import { Box, Text } from '../common'

export const MessageItemHead = ({ from, timestamp }) => {
  const styles = reactCSS({
    'default': {
      head: {
        padding: 15,
        paddingBottom: 0,
        display: 'flex',
        justifyContent: 'space-between',
      },
      left: {
        flex: 1,
        display: 'flex',
      },
      avatar: {
        width: 32,
        height: 32,
        border: '2px solid #eee',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 500,
        WebkitFontSmoothing: 'antialiased',
        color: 'rgba(0,0,0,.13)',
        textTransform: 'uppercase',
      },
      fromBox: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 12,
      },
      name: {
        color: '#444',
      },
      email: {
        color: '#ddd',
      },
      time: {
        color: '#aaa',
      },
    },
  })

  return (
    <Box style={ styles.head }>
      <Box style={ styles.left }>
        <Box style={ styles.avatar }>
          <Text>{ from.name[0] || from.email[0] }</Text>
        </Box>
        <Box style={ styles.fromBox }>
          <Text style={ styles.name }>{ from.name || from.email }</Text>
          <Text style={ styles.email }>{ from.email }</Text>
        </Box>
      </Box>
      <Text style={ styles.time }>
        { moment.unix(timestamp).twitter() }
      </Text>
    </Box>
  )
}

export default MessageItemHead
