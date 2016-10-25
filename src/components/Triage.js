import React from 'react'

import Messages from './messages/Messages'

export class Triage extends React.Component {
  componentDidMount() {
    this.props.getThreads(this.props.accessToken)
  }
  render() {
    const { activeThread, activeMessages, archiveThread, accessToken,
      getMessages } = this.props

    return (
      <div>

        { activeThread ? (
          <div
            style={{
              padding: '0 40px',
              maxWidth: '800px',
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: '0',
              right: '0',
              bottom: '0',
              left: '0',
            }}
          >
            <div style={{ flex: 1, overflow: 'scroll' }}>
              <div style={{ fontSize: '24px', color: '#333', paddingBottom: '20px', paddingTop: '40px' }}>{ activeThread.subject }</div>
              <Messages
                getMessages={ getMessages }
                accessToken={ accessToken }
                activeThread={ activeThread }
                activeMessages={ activeMessages }
              />
            </div>
            <div style={{ height: '64px', boxShadow: '0 -2px 0 rgba(0,0,0,.1)' }}>
              <br />
              <br />
              <div
                style={{
                  background: '#333',
                  color: '#fff',
                  padding: '5px 10px',
                  fontSize: '15px',
                  display: 'inline-block',
                }}
                onClick={ archiveThread.bind(null, this.props.accessToken,
                  activeThread.id, activeThread.labels) }
              >
                Archive
              </div>
            </div>
          </div>
        ) : null }
      </div>
    )
  }
}

export default Triage
