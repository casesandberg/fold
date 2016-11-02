import React from 'react'
import reactCSS from 'reactcss'
import _ from 'lodash'
import moment from 'moment-twitter'

import { Box, Text } from '../common'

export const SidebarItemHead = ({ unread, participants, timestamp }) => {
  const styles = reactCSS({
    'default': {
      head: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        opacity: 0.8,
      },
      people: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flexDirection: 'row',
      },
    },
    'unread': {
      time: {
        color: '#2196F3',
      },
    },
  }, { unread })

  return (
    <Box style={ styles.head }>
      <Box style={ styles.people }>
        { _.map(participants, (person, i) => {
          return <Text key={ i }>{ person.name } </Text>
        }) }
      </Box>
      <Text style={ styles.time }>{ moment.unix(timestamp).twitter() }</Text>
    </Box>
  )
}

export default SidebarItemHead
