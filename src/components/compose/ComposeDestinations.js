import React from 'react'
import reactCSS from 'reactcss'
import _ from 'lodash'

import { Box, Text } from '../common'

export const ComposeDestinations = (props) => {
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
      label: {
        textTransform: 'uppercase',
      },
    },
  })

  const fields = ['to', 'cc', 'bcc']

  return (
    <Box style={ styles.wrap }>
      { _.map(fields, field => (
        props[field].length ? (
          <Text style={ styles.item }>
            <Text style={ styles.label }>{ field }: </Text>
            { _(props[field]).map('name').join(', ') }
          </Text>
        ) : null
      )) }
    </Box>
  )
}

ComposeDestinations.defaultProps = {
  to: [],
  cc: [],
  bcc: [],
}

export default ComposeDestinations
