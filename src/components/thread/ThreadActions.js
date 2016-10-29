import React from 'react'
import reactCSS from 'reactcss'

export const ThreadActions = ({ archiveThread, activeThread }) => {
  const styles = reactCSS({
    'default': {
      button: {
        background: '#333',
        color: '#fff',
        padding: '5px 10px',
        fontSize: '15px',
        display: 'inline-block',
      },
    },
  })

  const handleArchive = () => activeThread && archiveThread(activeThread.id, activeThread.labels)

  return (
    <div style={ styles.actions }>
      <div style={ styles.button } onClick={ handleArchive }>
        Archive
      </div>
    </div>
  )
}

export default ThreadActions
