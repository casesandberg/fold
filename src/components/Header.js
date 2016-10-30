import React from 'react'
import reactCSS from 'reactcss'

export const Header = ({ activeThread, toggleSidebar }) => {
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
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '1',
      },
      icon: {
        width: '24px',
        height: '24px',
        paddingRight: '17px',
      },
    },
  })

  return (
    <div style={ styles.header }>
      <svg style={ styles.icon } onClick={ toggleSidebar } viewBox="0 0 24 24">
        <path fill="#aaa" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
      </svg>
      <div style={ styles.title }>{ activeThread && activeThread.subject }</div>
    </div>
  )
}

export default Header
