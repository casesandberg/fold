import React from 'react'

import Messages from './messages/Messages'

export class Triage extends React.Component {
  componentDidMount() {
    this.props.getThreads(this.props.accessToken)
  }
  render() {
    const { triageCount, activeThread, activeMessages, archiveThread, accessToken,
      getMessages } = this.props

    return (
      <div>
        <div>{ triageCount }</div>

        { activeThread ? (
          <div style={{ padding: '40px', maxWidth: '800px' }}>
            <div style={{ fontSize: '24px', color: '#333' }}>{ activeThread.subject }</div>
            <br />
            <br />
            <Messages
              getMessages={ getMessages }
              accessToken={ accessToken }
              activeThread={ activeThread }
              activeMessages={ activeMessages }
            />
            <br />
            <div
              style={{
                background: '#333',
                color: '#fff',
                padding: '5px 10px',
                fontSize: '15px',
              }}
              onClick={ archiveThread.bind(null, this.props.accessToken,
                activeThread.id, activeThread.labels) }
            >
              Archive
            </div>
          </div>
        ) : null }
      </div>
    )
  }
}

export default Triage
