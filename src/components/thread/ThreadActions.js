import React from 'react'
import reactCSS from 'reactcss'

export const ThreadActions = ({ archiveThread, activeThread }) => {
  const styles = reactCSS({
    'default': {
      actions: {
        background: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,.1), 0 0 2px rgba(0,0,0,.1), 0px -20px 10px #fafafa',
        borderRadius: '2px',
        height: '54px',
        marginBottom: '20px',
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'space-between',
      },
      replyWrap: {
        flex: '1',
        marginRight: '20px',
      },
      reply: {
        fontSize: '1.6rem',
        padding: '17px',
        border: 'none',
        width: '100%',
        boxSizing: 'border-box',
        height: '54px',
        outline: 'none',
        resize: 'none',
      },
      buttons: {
        display: 'flex',
        padding: '0 5px',
      },
      button: {
        padding: '15px 10px',
        cursor: 'pointer',
      },
    },
  })

  const handleArchive = () => activeThread && archiveThread(activeThread.id, activeThread.labels)

  return (
    <div style={ styles.actions }>
      <div style={ styles.replyWrap }>
        <textarea placeholder="Reply" style={ styles.reply } />
      </div>

      <div style={ styles.buttons }>
        <div style={ styles.button } onClick={ handleArchive }>
          <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
            <path fill="#aaa" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
          </svg>
        </div>

        <div style={ styles.button } onClick={ handleArchive }>
          <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
            <path fill="#aaa" d="M17,12L12,17V14H8V10H12V7L17,12M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12Z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ThreadActions
