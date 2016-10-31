import React from 'react'
import _ from 'lodash'

import { Box } from '../common'
import MessageItem from './MessageItem'
import SquashedMessages from './SquashedMessages'

export class Messages extends React.Component {
  componentDidMount() {
    this.props.getMessages(this.props.activeThread.message_ids)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.activeThread.id !== nextProps.activeThread.id) {
      this.props.getMessages(nextProps.activeThread.message_ids)
    }
  }
  render() {
    const { activeMessages } = this.props
    const length = activeMessages.length
    const squashedMessages = activeMessages.slice(1, length - 2)
    return (
      <Box>
        { length > 4 ? (
          <Box>
            <MessageItem key={ activeMessages[0].id } { ...activeMessages[0] } />
            <SquashedMessages messages={ squashedMessages } />
            <MessageItem key={ activeMessages[length - 2].id } { ...activeMessages[length - 2] } />
            <MessageItem key={ activeMessages[length - 1].id } { ...activeMessages[length - 1] } />
          </Box>
        ) : (
          _.map(activeMessages, (message, i) => {
            const last = i + 1 === activeMessages.length
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
