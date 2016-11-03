import React from 'react'
import reactCSS, { hover as handleHover } from 'reactcss'
import _ from 'lodash'

import { Box, Clickable, Icon, Textarea } from '../common'

export const Compose = ({ archiveThread, draft, thread, editDraft, reply, focusReply,
  blurReply, isReplyFocused, hover }) => {
  const styles = reactCSS({
    'default': {
      actions: {
        background: '#fff',

        boxShadow: '0 2px 5px rgba(0,0,0,.1), 0 0 2px rgba(0,0,0,.1), 0px -20px 10px #fafafa',
        transition: 'box-shadow 100ms ease-out',

        shadowOffset: {
          height: 2,
        },
        shadowRadius: 3,
        shadowColor: 'black',
        shadowOpacity: 0.2,

        borderRadius: 2,
        minHeight: 54,
        marginBottom: 20,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      replyWrap: {
        flex: 1,
        display: 'flex',
      },
      reply: {
        fontSize: 16,
        padding: 17,
        border: 'none',
        boxSizing: 'border-box',
        height: 54,
        outline: 'none',
        resize: 'none',
        flex: 1,
        background: 'none',
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
        height: 24,
        cursor: 'pointer',
      },
    },
    'hover': {
      actions: {
        boxShadow: '0 2px 5px rgba(0,0,0,.15), 0 0 2px rgba(0,0,0,.15), 0px -20px 10px #fafafa',
      },
    },
    'focused': {
      actions: {
        boxShadow: '0 4px 10px rgba(0,0,0,.2), 0 0 4px rgba(0,0,0,.2), 0px -20px 10px #fafafa',
      },
    },
  }, { hover, focused: isReplyFocused })

  const handleArchive = () => thread && archiveThread(thread.id, thread.labels)
  const handleChange = e => editDraft({
    'body': _.isString(e) ? e : e.target && e.target.value,
    'reply_to_message_id': thread.message_ids[thread.message_ids.length - 1],
    'thread_id': thread.id,
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
        <Textarea
          value={ draft.body || '' }
          onChange={ handleChange }
          placeholder="Reply"
          style={ styles.reply }
          onFocus={ focusReply }
          onBlur={ blurReply }
        />
      </Box>

      <Box style={ styles.buttons }>
        { draft && draft.body && draft.body.trim() !== '' ? (
          <Clickable onClick={ handleSend }>
            <Box style={ styles.button }>
              <Icon name="send" />
            </Box>
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

export default handleHover(Compose)
