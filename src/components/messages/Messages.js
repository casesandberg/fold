import React from 'react'
import _ from 'lodash'

import { Box } from '../common'
import MessageItem from './MessageItem'
import SquashedMessages from './SquashedMessages'

export class Messages extends React.Component {
  componentDidMount() {
    this.props.getMessages(this.props.thread.message_ids)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.thread.id !== nextProps.thread.id) {
      this.props.getMessages(nextProps.thread.message_ids)
    }
  }
  render() {
    const { messages } = this.props
    const length = messages.length
    const squashedMessages = messages.slice(1, length - 2)
    return (
      <Box>
        { length > 4 ? (
          <Box>
            <MessageItem key={ messages[0].id } { ...messages[0] } />
            <SquashedMessages messages={ squashedMessages } />
            <MessageItem key={ messages[length - 2].id } { ...messages[length - 2] } />
            <MessageItem key={ messages[length - 1].id } { ...messages[length - 1] } />
          </Box>
        ) : (
          _.map(messages, (message, i) => {
            const last = i + 1 === messages.length
            return (
              <MessageItem key={ message.id } { ...message } last={ last } />
            )
          })
        ) }
      </Box>
    )
  }
}

export default Messages
