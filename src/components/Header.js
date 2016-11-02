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
      },
    },
  })

  return (
    <Box style={ styles.header }>
      <Box style={ styles.iconWrap }>
        <Clickable onClick={ toggleSidebar }>
          <Icon name="menu" />
        </Clickable>
      </Box>
      <Text style={ styles.title }>{ title || 'Fetching...' }</Text>
    </Box>
  )
}

export default Header
