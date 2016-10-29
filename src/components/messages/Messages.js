import React from 'react'
import _ from 'lodash'

import MessageItem from './MessageItem'

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
    return (
      <div>
        { _.map(activeMessages, (message, i) => {
          const last = i + 1 === activeMessages.length
          return (
            <MessageItem key={ message.id } { ...message } last={ last } />
          )
        }) }
      </div>
    )
  }
}

export default Messages
