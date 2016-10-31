import React from 'react'
import _ from 'lodash'

import { Box, Clickable, Text } from '../common'
import MessageItem from './MessageItem'

export class SquashedMessages extends React.Component {
  state = {
    isExpanded: false,
  }

  handleExpand = () => {
    this.setState({ isExpanded: true })
  }

  render() {
    return (
      <Box>
        { this.state.isExpanded ? (
          _.map(this.props.messages, (message) => {
            return (
              <MessageItem key={ message.id } { ...message } />
            )
          })
        ) : (
          <Clickable onClick={ this.handleExpand }>
            <Box
              style={{
                background: '#fff',

                boxShadow: '0 2px 5px rgba(0,0,0,.1), 0 0 2px rgba(0,0,0,.1)',

                shadowOffset: {
                  height: 2,
                },
                shadowRadius: 3,
                shadowColor: 'black',
                shadowOpacity: 0.2,

                borderRadius: 2,
                marginBottom: 1,
                height: 54,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Text style={{ fontSize: 15, color: '#aaa' }}>
                ({ this.props.messages.length }) More Messages
              </Text>
            </Box>
          </Clickable>
        ) }
      </Box>
    )
  }
}

export default SquashedMessages
