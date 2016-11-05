import React from 'react'
import reactCSS from 'reactcss'

import { Box, Clickable, Icon, Text } from './common'

export const Header = ({ title, toggleSidebar }) => {
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
        paddingLeft: 8,
      },
      menuWrap: {
        display: 'flex',
        alignItems: 'center',
      },
    },
  })

  return (
    <Box style={ styles.header }>
      <Box style={ styles.iconWrap }>
        <Clickable onClick={ toggleSidebar } style={ styles.menuWrap }>
          <Icon name="menu" />
        </Clickable>
      </Box>
      <Text style={ styles.title }>{ title || 'Breathe...' }</Text>
    </Box>
  )
}

export default Header
