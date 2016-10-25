import React from 'react'

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
        { activeMessages.map((message) => {
          return (
            <div
              key={ message.id }
              style={{
                border: '1px solid #eee',
                marginBottom: '-1px',
                padding: '15px',
                fontSize: '15px',
              }}
            >
              { message.unread ? (
                <div>
                  <div>{ message.from[0].name } </div>
                  <iframe
                    style={{ border: 'none', width: '100%', height: '300px' }}
                    srcDoc={ message.body }
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
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
