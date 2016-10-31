import React from 'react'
import reactCSS from 'reactcss'
import moment from 'moment-twitter'

export const MessageItemSnippet = ({ from, snippet, timestamp, onClick }) => {
  const styles = reactCSS({
    'default': {
      wrap: {
        height: '54px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '1.6rem',
        padding: '0 15px',
      },
      snippet: {
        flex: '1',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        color: '#444',
        marginRight: '15px',
      },
      name: {
        fontWeight: 'bold',
        // WebkitFontSmoothing: 'antialiased',
      },
      time: {
        color: '#aaa',
      },
    },
  })

  return (
    <div style={ styles.wrap } onClick={ onClick }>
      <div style={ styles.snippet }>
        <span style={ styles.name }>{ from[0].name }</span> { snippet }
      </div>
      <div style={ styles.time }>
        { moment.unix(timestamp).twitter() }
      </div>
    </div>
  )
}

export default MessageItemSnippet
