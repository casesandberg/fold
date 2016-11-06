import React from 'react'
import _ from 'lodash'

import { Box } from '../common'
import MessageItem from './MessageItem'
import SquashedMessages from './SquashedMessages'

export class Messages extends React.Component {
  componentDidMount() {
    this.props.getMessages(this.props.thread.message_ids).then(
      this.props.markThreadAsRead(this.props.thread.id)
    )
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.thread.id !== nextProps.thread.id) {
      this.props.getMessages(nextProps.thread.message_ids).then(
        this.props.markThreadAsRead(this.props.thread.id)
      )
    }
  }
  render() {
    const { messages, uncollapseAll, openMessage } = this.props
    const squashedMessages = _.filter(messages, { visibility: 'collapsed' })
    const squashedId = squashedMessages[0] && squashedMessages[0].id
    const handleUncollapse = () => uncollapseAll(_.map(squashedMessages, 'id'))

    return (
      <Box>
        { _.map(messages, (message) => {
          return (
            <Box key={ message.id }>
              { message.id === squashedId ? (
                <SquashedMessages messages={ squashedMessages } onExpand={ handleUncollapse } />
              ) : null }
              <MessageItem
                openMessage={ openMessage }
                { ...message }
              />
            </Box>
          )
        }) }
      </Box>
    )
  }
}

export default Messages
