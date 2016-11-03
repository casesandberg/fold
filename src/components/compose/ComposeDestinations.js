import React from 'react'
import reactCSS from 'reactcss'
import _ from 'lodash'

import { Box, Text } from '../common'

export const ComposeDestinations = ({ to, cc, bcc }) => {
  const styles = reactCSS({
    'default': {
      wrap: {
        margin: 15,
        marginBottom: 0,
        display: 'flex',
      },
      item: {
        marginRight: 10,
        color: '#aaa',
      },
    },
  })
  return (
    <Box style={ styles.wrap }>
      { to.length ? (
        <Text style={ styles.item }>To: { _(to).map('name').join(', ') }</Text>
      ) : null }

      { cc.length ? (
        <Text style={ styles.item }>CC: { _(cc).map('name').join(', ') }</Text>
      ) : null }

      { bcc.length ? (
        <Text style={ styles.item }>BCC: { _(bcc).map('name').join(', ') }</Text>
      ) : null }
    </Box>
  )
}

export default ComposeDestinations
