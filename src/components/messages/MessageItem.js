import React from 'react'
import reactCSS from 'reactcss'
import { formatEmail } from '../../helpers/email'

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
          marginBottom: '1px',
        },
      },
    })

    return (
      <div style={ styles.message }>
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
      </div>
    )
  }
}

export default MessageItem
