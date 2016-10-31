import React from 'react'
import reactCSS from 'reactcss'
import { formatEmail } from '../../helpers/email'

import { Box } from '../common'
import FullFrame from '../common/FullFrame'
import MessageItemSnippet from './MessageItemSnippet'

export class MessageItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: props.unread || props.last,
    }
  }

  handleExpand = () => {
    this.setState({ isExpanded: true })
  }

  render() {
    const { body, from, snippet, date } = this.props

    const styles = reactCSS({
      'default': {
        message: {
          background: '#fff',

          boxShadow: '0 2px 5px rgba(0,0,0,.1), 0 0 2px rgba(0,0,0,.1)',

          shadowOffset: {
            height: 2,
          },
          shadowRadius: 3,
          shadowColor: 'black',
          shadowOpacity: 0.2,

          marginBottom: 1,
          borderRadius: 2,
        },
      },
    })

    return (
      <Box style={ styles.message }>
        { this.state.isExpanded ? (
          <FullFrame
            style={{ border: 'none', width: '100%', height: '1px' }}
            body={ formatEmail(body) }
          />
        ) : (
          <MessageItemSnippet
            from={ from }
            snippet={ snippet }
            timestamp={ date }
            onClick={ this.handleExpand }
          />
        ) }
      </Box>
    )
  }
}

export default MessageItem
