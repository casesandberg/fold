import React from 'react'
import reactCSS from 'reactcss'
import { formatEmail } from '../../helpers/email'

import { Box } from '../common'
import FullFrame from '../common/FullFrame'
import MessageItemSnippet from './MessageItemSnippet'
import MessageItemHead from './MessageItemHead'

export const MessageItem = ({ id, body, from, snippet, date, visibility,
  openMessage }) => {
  const styles = reactCSS({
    'default': {
      message: {
        background: '#fff',

        boxShadow: '0 2px 5px rgba(0,0,0,.1), 0 0 2px rgba(0,0,0,.1)',

        shadowOffset: {
          height: 2,
        },
        shadowRadius: 3,
        shadowColor: 'black',
        shadowOpacity: 0.2,

        marginBottom: 1,
        borderRadius: 2,
        display: 'flex',
      },
    },
    'collapsed': {
      message: {
        marginBottom: 0,
      },
    },
  }, { collapsed: visibility === 'collapsed' })

  const handleClick = () => openMessage(id)

  const message = {
    open: (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <MessageItemHead from={ from[0] } timestamp={ date } />
        <FullFrame
          style={{ border: 'none', flex: 1 }}
          body={ formatEmail(body) }
        />
      </div>
    ),
    closed: (
      <MessageItemSnippet
        from={ from }
        snippet={ snippet }
        timestamp={ date }
        onClick={ handleClick }
      />
    ),
    collapsed: null,
  }[visibility || 'open']

  return (
    <Box style={ styles.message }>{ message }</Box>
  )
}

export default MessageItem
