import React from 'react'
import reactCSS from 'reactcss'
import _ from 'lodash'

export const SidebarItemHead = ({ unread, participants }) => {
  const styles = reactCSS({
    'default': {
      head: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      people: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      time: {
        color: '#999',
      },
    },
    'unread': {
      time: {
        color: '#2196F3',
      },
    },
  }, { unread })

  return (
    <div style={ styles.head }>
      <div style={ styles.people }>
        { _.map(participants, (person, i) => {
          return <span key={ i }>{ person.name } </span>
        }) }
      </div>
      <div style={ styles.time }>3:30pm</div>
    </div>
  )
}

export default SidebarItemHead
