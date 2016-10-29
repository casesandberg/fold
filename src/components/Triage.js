import React from 'react'

import Messages from './messages/Messages'
import SidebarContainer from '../containers/SidebarContainer'

export class Triage extends React.Component {
  componentDidMount() {
    this.props.getThreads()
  }
  render() {
    const { activeThread, activeMessages, archiveThread, getMessages } = this.props

    return (
      <div style={{ display: 'flex', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
        <div style={{ width: '300px', overflow: 'scroll' }}>
          <SidebarContainer />
        </div>
        <div style={{ flex: '1', position: 'relative' }}>
          { activeThread ? (
            <div
              style={{
                padding: '0 20px',
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
                  onClick={ archiveThread.bind(null, activeThread.id, activeThread.labels) }
                >
                  Archive
                </div>
              </div>
            </div>
          ) : null }
        </div>
      </div>
    )
  }
}

export default Triage
