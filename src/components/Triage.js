import React from 'react'
import reactCSS from 'reactcss'

import { Platform } from 'react-native'

import { Box } from './common'
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
      isSidebarVisible, editDraft, activeDraft, reply } = this.props

    const styles = reactCSS({
      'default': {
        wrap: {
          backgroundColor: '#fafafa',
          paddingTop: Platform.OS === 'web' ? 0 : 22,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: 'stretch',
          justifyContent: 'center',
        },
        triage: {
          maxWidth: 630,
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
      'web': {
        wrap: {
          display: 'flex',
        },
      },
    }, { web: Platform.OS === 'web' })

    // { isSidebarVisible ? (
    //   <Box style={ styles.sidebar }>
    //     <SidebarContainer />
    //   </Box>
    // ) : null }
    //
    // <Box style={ styles.triage }>
    //   <Box style={ styles.messages }>
    //     <HeaderContainer />
    //     { activeThread ? (
    //       <Box style={ styles.messagesList }>
    //         <Messages
    //           getMessages={ getMessages }
    //           activeThread={ activeThread }
    //           activeMessages={ activeMessages }
    //         />
    //       </Box>
    //     ) : null }
    //   </Box>
    //
    //   <Box style={ styles.actions }>
    //     <ThreadActions
    //       activeThread={ activeThread }
    //       archiveThread={ archiveThread }
    //       editDraft={ editDraft }
    //       draft={ activeDraft }
    //       reply={ reply }
    //     />
    //   </Box>
    // </Box>

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
            { activeThread ? (
              <Box style={ styles.messagesList }>
                <Messages
                  getMessages={ getMessages }
                  activeThread={ activeThread }
                  activeMessages={ activeMessages }
                />
              </Box>
            ) : null }
          </Box>

          <Box style={ styles.actions }>
            <ThreadActions
              activeThread={ activeThread }
              archiveThread={ archiveThread }
              editDraft={ editDraft }
              draft={ activeDraft }
              reply={ reply }
            />
          </Box>
        </Box>
      </Box>
    )
  }
}

export default Triage
