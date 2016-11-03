import React from 'react'
import reactCSS from 'reactcss'

import { Platform } from 'react-native'

import { Box } from './common'
import Messages from './messages/Messages'
import SidebarContainer from '../containers/SidebarContainer'
import HeaderContainer from '../containers/HeaderContainer'
import ComposeContainer from '../containers/ComposeContainer'

export class Triage extends React.Component {
  componentDidMount() {
    this.props.getThreads().then(({ threads }) => {
      this.props.showThread('edxjoxv0e86mez97jz9dz4h4w' || '9hmomtkespdrbkdvv7odrf9wp' || threads[0].id)
    })
  }
  render() {
    const { thread, messages, getMessages, isSidebarVisible, activeEmailDisplay,
      uncollapseAll, openMessage } = this.props

    const styles = reactCSS({
      'default': {
        wrap: {
          display: 'flex',
          backgroundColor: '#fafafa',
          paddingTop: Platform.OS === 'web' ? 0 : 22,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: 'stretch',
          flexDirection: 'row',
          justifyContent: 'center',
        },
        triage: {
          maxWidth: 630,
          minWidth: 300,
          flex: 1,
          paddingRight: 10,
          paddingLeft: 10,
          fontFamily: 'Roboto',
          fontSize: 16,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        messages: {
          flex: 1,
          overflow: 'scroll',
          paddingRight: 10,
          paddingLeft: 10,
          marginRight: -10,
          marginLeft: -10,
        },
        messagesList: {
          paddingBottom: 100,
        },
        sidebar: {
          width: 300,
          overflow: 'scroll',
          marginRight: 30,
        },
        actions: {
          position: 'relative',
          zIndex: 2,
        },
      },
    })

    return (
      <Box style={ styles.wrap }>
        { isSidebarVisible ? (
          <Box style={ styles.sidebar }>
            <SidebarContainer />
          </Box>
        ) : null }

        <Box style={ styles.triage }>
          <Box style={ styles.messages }>
            <HeaderContainer />
            { thread.id ? (
              <Box style={ styles.messagesList }>
                <Messages
                  getMessages={ getMessages }
                  thread={ thread }
                  messages={ messages }
                  activeEmailDisplay={ activeEmailDisplay }
                  uncollapseAll={ uncollapseAll }
                  openMessage={ openMessage }
                />
              </Box>
            ) : null }
          </Box>

          <Box style={ styles.actions }>
            <ComposeContainer />
          </Box>
        </Box>
      </Box>
    )
  }
}

export default Triage
