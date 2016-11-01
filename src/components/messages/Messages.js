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
    const { messages, activeEmailDisplay, uncollapseAll, openMessage } = this.props
    const squashedId = _.findKey(activeEmailDisplay, m => m === 'collapsed')

    return (
      <Box>
        { _.map(messages, (message) => {
          return (
            <Box>
              { message.id === squashedId ? (
                <SquashedMessages onExpand={ uncollapseAll } />
              ) : null }
              <MessageItem
                openMessage={ openMessage }
                key={ message.id }
                { ...message }
                visibility={ activeEmailDisplay[message.id] }
              />
            </Box>
          )
        }) }
      </Box>
    )
  }
}

export default Messages
