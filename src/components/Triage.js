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
    const { activeThread, activeMessages, archiveThread, getMessages, showSidebar } = this.props

    const styles = reactCSS({
      'default': {
        wrap: {
          display: 'flex',
          absolute: '0 0 0 0',
          alignItems: 'stretch',
          justifyContent: 'center',
        },
        triage: {
          maxWidth: '600px',
          width: '100%',
          fontFamily: 'Roboto',
          fontSize: '1.6rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        sidebar: {
          width: '300px',
          overflow: 'scroll',
          marginRight: '30px',
        },
      },
    })

    return (
      <div style={ styles.wrap }>

        { showSidebar ? (
          <div style={ styles.sidebar }>
            <SidebarContainer />
          </div>
        ) : null }

        <div style={ styles.triage }>
          <div style={ styles.messages }>
            <HeaderContainer />
            { activeThread ? (
              <Messages
                getMessages={ getMessages }
                activeThread={ activeThread }
                activeMessages={ activeMessages }
              />
            ) : null }
          </div>

          <ThreadActions activeThread={ activeThread } archiveThread={ archiveThread } />
        </div>
      </div>
    )
  }
}

export default Triage
