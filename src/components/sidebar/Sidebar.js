import React from 'react'
import _ from 'lodash'

export const Sidebar = ({ threads, onSelect, activeThreadID }) => {
  return (
    <div style={{ borderRight: '1px solid #f6f6f6' }}>
      { _.map(threads, (thread, i) => {
        const active = thread.id === activeThreadID ? {
          background: '#E7EFFA',
          boxShadow: 'inset -3px 0 #2196F3',
        } : {}
        const read = !thread.unread ? {
          background: '#f6f6f6',
          color: '#666',
        } : {}
        return (
          <div
            key={ thread.id + i }
            onClick={ onSelect.bind(null, thread.id) }
            style={{
              marginBottom: '1px',
              cursor: 'pointer',
              fontSize: '15px',
              padding: '15px',
              ...read,
              ...active,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
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
            fontWeight: thread.unread ? 'bold' : 'normal' }}
            >
              { thread.subject } { thread.message_ids.length > 1 ? `(${ thread.message_ids.length })` : null }
            </div>
            <div style={{ width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: '#999' }}
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
