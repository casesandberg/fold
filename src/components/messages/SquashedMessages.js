import React from 'react'
import _ from 'lodash'

import MessageItem from './MessageItem'

export class SquashedMessages extends React.Component {
  state = {
    isExpanded: false,
  }

  handleExpand = () => {
    this.setState({ isExpanded: true })
  }

  render() {
    return (
      <div>
        { this.state.isExpanded ? (
          _.map(this.props.messages, (message) => {
            return (
              <MessageItem key={ message.id } { ...message } />
            )
          })
        ) : (
          <div
            style={{
              background: '#fff',
              boxShadow: '0 2px 5px rgba(0,0,0,.1), 0 0 2px rgba(0,0,0,.1)',
              borderRadius: '2px',
              marginBottom: '1px',
              color: '#aaa',
              height: '54px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={ this.handleExpand }
          >
            ({ this.props.messages.length }) More Messages
          </div>
        ) }
      </div>
    )
  }
}

export default SquashedMessages
