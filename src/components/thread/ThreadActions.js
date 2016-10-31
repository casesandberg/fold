import React from 'react'
import reactCSS from 'reactcss'
import _ from 'lodash'

import { Box, Clickable, Icon, Input, Text } from '../common'

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
          <Icon name="clock" />
        </Box>

        <Box style={ styles.button } onClick={ handleArchive }>
          <Icon name="folder-outline" />
        </Box>
      </Box>
    </Box>
  )
}

export default ThreadActions
