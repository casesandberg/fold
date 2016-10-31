import React from 'react'
import reactCSS from 'reactcss'

import SidebarItemHead from './SidebarItemHead'

export const SidebarItem = ({ id, active, unread, last_message_timestamp, participants, subject,
  message_ids, snippet, onSelect }) => {
  const styles = reactCSS({
    'default': {
      item: {
        marginBottom: '1px',
        cursor: 'pointer',
        fontSize: '15px',
        padding: '15px',
      },
      subject: {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontWeight: 'bold',
      },
      snippet: {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#999',
      },
    },
    'active': {
      item: {
        background: '#E7EFFA',
        boxShadow: 'inset -3px 0 #2196F3',
      },
    },
    'read': {
      item: {
        background: '#f6f6f6',
        color: '#666',
        fontWeight: 'normal',
      },
    },
  }, { read: !unread, active })
  const handleClick = () => onSelect(id)

  return (
    <div style={ styles.item } onClick={ handleClick }>
      <SidebarItemHead participants={ participants } unread={ unread } timestamp={ last_message_timestamp } />
      <div style={ styles.subject }>
        { subject } { message_ids.length > 1 ? `(${ message_ids.length })` : null }
      </div>
      <div style={ styles.snippet }>
        { snippet }
      </div>
    </div>
  )
}

export default SidebarItem
