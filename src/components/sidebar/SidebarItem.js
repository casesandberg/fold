/* eslint-disable camelcase */

import React from 'react'
import reactCSS from 'reactcss'

import { Box, Clickable, Text } from '../common'
import SidebarItemHead from './SidebarItemHead'

export const SidebarItem = ({ id, active, unread, last_message_timestamp, participants, subject,
  message_ids, snippet, onSelect }) => {
  const styles = reactCSS({
    'default': {
      item: {
        borderBottom: '1px solid #f6f6f6',
        color: '#444',
        cursor: 'pointer',
        fontSize: 15,
        padding: 15,
        backgroundColor: '#fff',
      },
      subject: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontWeight: 600,
        flexDirection: 'row',
      },
      snippet: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        opacity: 0.4,
      },
    },
    'active': {
      item: {
        backgroundColor: '#E7EFFA',
        boxShadow: 'inset -3px 0 #2196F3',
      },
    },
    'read': {
      item: {
        backgroundColor: '#f6f6f6',
        color: '#aaa',
        fontWeight: 400,
      },
    },
  }, { read: !unread, active })
  const handleClick = () => onSelect(id)

  return (
    <Clickable onClick={ handleClick }>
      <Box style={ styles.item }>
        <SidebarItemHead
          participants={ participants }
          unread={ unread }
          timestamp={ last_message_timestamp }
        />
        <Box style={ styles.subject }>
          <Text numberOfLines={ 1 }>{ subject } { message_ids.length > 1 ? `(${ message_ids.length })` : null }</Text>
        </Box>
        <Box style={ styles.snippet }>
          <Text numberOfLines={ 1 }>{ snippet }</Text>
        </Box>
      </Box>
    </Clickable>
  )
}

export default SidebarItem
