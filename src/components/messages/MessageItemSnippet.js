import React from 'react'
import reactCSS from 'reactcss'
import moment from 'moment-twitter'

import { Box, Clickable, Text } from '../common'

export const MessageItemSnippet = ({ from, snippet, timestamp, onClick }) => {
  const styles = reactCSS({
    'default': {
      wrap: {
        height: 54,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 16,
        paddingRight: 15,
        paddingLeft: 15,
      },
      snippet: {
        flex: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        color: '#444',
        marginRight: 15,
      },
      name: {
        fontWeight: 'bold',
        WebkitFontSmoothing: 'antialiased',
      },
      time: {
        color: '#aaa',
      },
    },
  })

  return (
    <Clickable onClick={ onClick } style={{ flex: 1 }}>
      <Box style={ styles.wrap }>
        <Box style={ styles.snippet }>
          <Text>
            <Text style={ styles.name }>{ from[0].name }</Text> { snippet }
          </Text>
        </Box>
        <Text style={ styles.time }>
          { moment.unix(timestamp).twitter() }
        </Text>
      </Box>
    </Clickable>
  )
}

export default MessageItemSnippet
