import React from 'react'
import _ from 'lodash'

import { Box } from 'react-universal'
import SidebarItem from './SidebarItem'

export const Sidebar = ({ threads, showThread, activeThreadID }) => {
  return (
    <Box style={{ borderRight: '1px solid #f6f6f6' }}>
      { _.map(threads, (thread, i) => (
        <SidebarItem
          key={ thread.id + i }
          onSelect={ showThread }
          active={ thread.id === activeThreadID }
          { ...thread }
        />
      )) }
    </Box>
  )
}

export default Sidebar
