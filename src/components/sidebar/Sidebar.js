import React from 'react'
import _ from 'lodash'

import SidebarItem from './SidebarItem'

export const Sidebar = ({ threads, showThread, activeThreadID }) => {
  return (
    <div style={{ borderRight: '1px solid #f6f6f6' }}>
      { _.map(threads, (thread, i) => (
        <SidebarItem
          key={ thread.id + i }
          onSelect={ showThread }
          active={ thread.id === activeThreadID }
          { ...thread }
        />
      )) }
    </div>
  )
}

export default Sidebar
