import React from 'react'
import reactCSS from 'reactcss'
import _ from 'lodash'

import { Box, Clickable, Input, Path, Svg, Text } from '../common'

export const ThreadActions = ({ archiveThread, activeThread, editDraft, draft, reply }) => {
  const styles = reactCSS({
    'default': {
      actions: {
        background: '#fff',

        boxShadow: '0 2px 5px rgba(0,0,0,.1), 0 0 2px rgba(0,0,0,.1), 0px -20px 10px #fafafa',

        shadowOffset: {
          height: 2,
        },
        shadowRadius: 3,
        shadowColor: 'black',
        shadowOpacity: 0.2,

        borderRadius: 2,
        height: 54,
        marginBottom: 20,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      replyWrap: {
        flex: 1,
        marginRight: 20,
      },
      reply: {
        fontSize: 16,
        padding: 17,
        border: 'none',
        boxSizing: 'border-box',
        height: 54,
        outline: 'none',
        resize: 'none',
      },
      buttons: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 5,
        paddingLeft: 5,
      },
      button: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 10,
        paddingLeft: 10,
        cursor: 'pointer',
      },
    },
  })

  const handleArchive = () => activeThread && archiveThread(activeThread.id, activeThread.labels)
  const handleChange = e => editDraft({
    'body': _.isString(e) ? e : e.target && e.target.value,
    'reply_to_message_id': activeThread.message_ids[activeThread.message_ids.length - 1],
    'thread_id': activeThread.id,
    'to': [
      {
        'name': 'Case',
        'email': 'case@casesandberg.com',
      },
    ],
    'from': [
      {
        'name': 'Case',
        'email': 'case@casesandberg.com',
      },
    ],
  })

  const handleSend = () => reply(draft)

  return (
    <Box style={ styles.actions }>
      <Box style={ styles.replyWrap }>
        <Input
          value={ draft.body }
          onChange={ handleChange }
          placeholder="Reply"
          style={ styles.reply }
        />
      </Box>

      <Box style={ styles.buttons }>
        { draft && draft.body && draft.body.trim() !== '' ? (
          <Clickable onClick={ handleSend }>
            <Text>SEND</Text>
          </Clickable>
        ) : null }
        <Box style={ styles.button } onClick={ handleArchive }>
          <Svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
            <Path fill="#aaa" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
          </Svg>
        </Box>

        <Box style={ styles.button } onClick={ handleArchive }>
          <Svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
            <Path fill="#aaa" d="M17,12L12,17V14H8V10H12V7L17,12M2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12M4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12Z" />
          </Svg>
        </Box>
      </Box>
    </Box>
  )
}

export default ThreadActions
