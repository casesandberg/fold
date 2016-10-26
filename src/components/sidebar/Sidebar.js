import React from 'react'
import _ from 'lodash'

export const Sidebar = ({ threads, onSelect, activeThreadID }) => {
  return (
    <div>
      { _.map(threads, (thread) => {
        const active = thread.id === activeThreadID ? {
          background: '#eee',
        } : {}
        return (
          <div
            key={ thread.id }
            onClick={ onSelect.bind(null, thread.id) }
            style={{
              cursor: 'pointer',
              fontSize: '15px',
              padding: '15px',
              ...active,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ color: '#999', whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis' }}
              >
                { _.map(thread.participants, (person, i) => {
                  return <span key={ i }>{ person.name } </span>
                }) }
              </div>
              <div style={{ color: thread.unread ? '#2196F3' : '#999' }}>3:30pm</div>
            </div>
            <div style={{ width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 'bold' }}
            >
              { thread.subject } { thread.message_ids.length > 1 ? `(${ thread.message_ids.length })` : null }
            </div>
            <div style={{ width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis' }}
            >
              { thread.snippet }
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Sidebar
