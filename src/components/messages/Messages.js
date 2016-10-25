import React from 'react'

import FullFrame from '../common/FullFrame'

export class Messages extends React.Component {
  componentDidMount() {
    this.props.getMessages(this.props.accessToken, this.props.activeThread.message_ids)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.activeThread.id !== nextProps.activeThread.id) {
      this.props.getMessages(nextProps.accessToken, nextProps.activeThread.message_ids)
    }
  }
  render() {
    const { activeMessages } = this.props
    return (
      <div>
        { activeMessages.map((message, i) => {
          const last = i + 1 === activeMessages.length
          return (
            <div
              key={ message.id }
              style={{
                border: '1px solid #eee',
                marginBottom: '-1px',

                fontSize: '15px',
              }}
            >
              { message.unread || last ? (
                <FullFrame
                  style={{ border: 'none', width: '100%', height: 'auto' }}
                  body={ message.body }
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    padding: '15px',
                  }}
                >
                  <span>{ message.from[0].name } </span>
                  <span style={{ color: '#999' }}>{ message.snippet }</span>
                </div>
              ) }
            </div>
          )
        }) }
      </div>
    )
  }
}

export default Messages
