import React from 'react'
import reactCSS from 'reactcss'

import { Box } from './common'
import Messages from './messages/Messages'
import ThreadActions from './thread/ThreadActions'
import SidebarContainer from '../containers/SidebarContainer'
import HeaderContainer from '../containers/HeaderContainer'

export class Triage extends React.Component {
  componentDidMount() {
    // this.props.getThreads()
  }
  render() {
    const { activeThread, activeMessages, archiveThread, getMessages,
      isSidebarVisible, editDraft, activeDraft, reply } = this.props

    const styles = reactCSS({
      'default': {
        wrap: {
          display: 'flex',
          // position: 'absolute',
          // top: '0px',
          // bottom: '0px',
          // left: '0px',
          // right: '0px',
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
      <Box style={ styles.wrap } />
    )
  }
}

export default Triage
