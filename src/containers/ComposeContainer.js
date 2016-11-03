import { connect } from 'react-redux'
import { selectors } from '../reducers'
import { actions as threadActions } from '../reducers/threads'
import { actions as messageActions } from '../reducers/messages'

import Compose from '../components/compose/Compose'

const mapStateToProps = (state) => {
  const thread = selectors.getActiveThread(state)
  const lastMessageID = thread.id && thread.message_ids[thread.message_ids.length - 1]
  return {
    thread,
    lastMessageID,
    lastMessage: selectors.getMessageByID(state, lastMessageID) || {},
    draft: state.messages.drafts[selectors.getActiveThreadID(state)] || {},
    isReplyFocused: state.messages.ui.isReplyFocused,
  }
}

const ComposeContainer = connect(
  mapStateToProps,
  { ...threadActions, ...messageActions }
)(Compose)

export default ComposeContainer
