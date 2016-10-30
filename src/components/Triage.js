import React from 'react'
import reactCSS from 'reactcss'

import Messages from './messages/Messages'
import ThreadActions from './thread/ThreadActions'
import SidebarContainer from '../containers/SidebarContainer'
import HeaderContainer from '../containers/HeaderContainer'

export class Triage extends React.Component {
  componentDidMount() {
    this.props.getThreads()
  }
  render() {
    const { activeThread, activeMessages, archiveThread, getMessages,
      isSidebarVisible } = this.props

    const styles = reactCSS({
      'default': {
        wrap: {
          display: 'flex',
          absolute: '0 0 0 0',
          alignItems: 'stretch',
          justifyContent: 'center',
        },
        triage: {
          maxWidth: '630px',
          width: '100%',
          fontFamily: 'Roboto',
          fontSize: '1.6rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        messages: {
          flex: '1',
          overflow: 'auto',
          padding: '0 10px',
          margin: '0 -10px',
        },
        messagesList: {
          paddingBottom: '100px',
        },
        sidebar: {
          width: '300px',
          overflow: 'scroll',
          marginRight: '30px',
        },
        actions: {
          position: 'relative',
          zIndex: '2',
        },
      },
    })

    return (
      <div style={ styles.wrap }>

        { isSidebarVisible ? (
          <div style={ styles.sidebar }>
            <SidebarContainer />
          </div>
        ) : null }

        <div style={ styles.triage }>
          <div style={ styles.messages }>
            <HeaderContainer />
            { activeThread ? (
              <div style={ styles.messagesList }>
                <Messages
                  getMessages={ getMessages }
                  activeThread={ activeThread }
                  activeMessages={ activeMessages }
                />
              </div>
            ) : null }
          </div>

          <div style={ styles.actions }>
            <ThreadActions activeThread={ activeThread } archiveThread={ archiveThread } />
          </div>
        </div>
      </div>
    )
  }
}

export default Triage
