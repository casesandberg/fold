import React from 'react'
import reactCSS from 'reactcss'

import { Platform } from 'react-native'
import { Box } from 'react-universal'
import Messages from './messages/Messages'
import HeaderContainer from '../containers/HeaderContainer'
import ComposeContainer from '../containers/ComposeContainer'

export class Thread extends React.Component {
  componentDidMount() {
    this.props.getThreads().then(({ threads }) => {
      threads && this.props.showThread(threads[0].id)
    })
  }
  render() {
    const { thread, messages, getMessages, uncollapseAll, openMessage,
      markThreadAsRead } = this.props

    const styles = reactCSS({
      'default': {
        wrap: {
          boxSizing: 'border-box',
          flex: 1,
          paddingRight: 10,
          paddingLeft: 10,
          fontFamily: 'Roboto',
          fontSize: 16,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        top: {
          flex: 1,
          overflow: 'scroll',
        },
        header: {
          maxWidth: 630,
          minWidth: 300,
        },
        thread: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        messages: {
          maxWidth: 630,
          minWidth: 300,
          paddingRight: 10,
          paddingLeft: 10,
          paddingTop: 10,
          marginRight: -10,
          marginLeft: -10,
          marginTop: -10,
          paddingBottom: 100,
        },
        bottom: {
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
        },
        composer: {
          maxWidth: 630,
          minWidth: 300,
          flex: 1,
        },
      },
      'web': {
        wrap: {
          maxWidth: '100%',
        },
        header: {
          width: '100%',
        },
        messages: {
          width: '100%',
        },
      },
    }, { web: Platform.OS === 'web' })

    return (
      <Box style={ styles.wrap }>
        <Box style={ styles.top }>
          <Box style={ styles.thread }>
            <Box style={ styles.header }>
              <HeaderContainer />
            </Box>
            { thread.id ? (
              <Box style={ styles.messages }>
                <Messages
                  getMessages={ getMessages }
                  thread={ thread }
                  messages={ messages }
                  uncollapseAll={ uncollapseAll }
                  openMessage={ openMessage }
                  markThreadAsRead={ markThreadAsRead }
                />
              </Box>
            ) : null }
          </Box>
        </Box>

        <Box style={ styles.bottom }>
          <Box style={ styles.composer }>
            <ComposeContainer />
          </Box>
        </Box>
      </Box>
    )
  }
}

export default Thread
