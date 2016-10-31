import React from 'react'
import reactCSS from 'reactcss'

import { Box, Clickable, Path, Svg, Text } from './common'

export const Header = ({ activeThread, toggleSidebar }) => {
  const styles = reactCSS({
    'default': {
      header: {
        display: 'flex',
        flexDirection: 'row',
        height: 64,
        alignItems: 'center',
      },
      title: {
        fontSize: 20,
        color: '#aaa',
        WebkitFontSmoothing: 'antialiased',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: 1,
      },
      iconWrap: {
        paddingRight: 17,
      },
      icon: {
        width: 24,
        height: 24,
      },
    },
  })

  return (
    <Box style={ styles.header }>
      <Box style={ styles.iconWrap }>
        <Clickable onClick={ toggleSidebar }>
          <Svg style={ styles.icon } viewBox="0 0 24 24">
            <Path fill="#aaa" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </Svg>
        </Clickable>
      </Box>
      <Text style={ styles.title }>{ activeThread && activeThread.subject }</Text>
    </Box>
  )
}

export default Header
