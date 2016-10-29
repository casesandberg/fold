import React from 'react'
import reactCSS from 'reactcss'

export const Header = ({ activeThread }) => {
  const styles = reactCSS({
    'default': {
      header: {
        display: 'flex',
        height: '64px',
        alignItems: 'center',
      },
      title: {
        fontSize: '2.0rem',
        color: '#aaa',
        WebkitFontSmoothing: 'antialiased',
      },
    },
  })

  return (
    <div style={ styles.header }>
      <div style={ styles.title }>{ activeThread && activeThread.subject }</div>
    </div>
  )
}

export default Header
