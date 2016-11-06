import React from 'react'
import reactCSS from 'reactcss'

import { Platform } from 'react-native'

import { Box } from './common'
import SidebarContainer from '../containers/SidebarContainer'
import ThreadContainer from '../containers/ThreadContainer'

export class Triage extends React.Component {
  componentDidMount() {
    this.props.getAccount()
  }

  render() {
    const { isSidebarVisible } = this.props

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
        },
        sidebar: {
          width: 300,
          minWidth: 300,
          overflow: 'scroll',
          marginRight: 30,
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

        <ThreadContainer />
      </Box>
    )
  }
}

export default Triage
