import { connect } from 'react-redux'
import { selectors } from '../reducers'
import { actions as threadActions } from '../reducers/threads'
import { actions as messageActions } from '../reducers/messages'

import Compose from '../components/compose/Compose'

const mapStateToProps = state => ({
  thread: selectors.getActiveThread(state) || {},
  lastMessage: selectors.getLastMessageByThread(state, selectors.getActiveThread(state) || {}),
  nextThreadID: selectors.getNextThreadID(state, selectors.getActiveThread(state).id),
  draft: selectors.getDraftByID(state, selectors.getActiveThreadID(state)) || {},
  isReplyFocused: selectors.getComposeFocus(state),
  account: selectors.getAccount(state),
})

const ComposeContainer = connect(
  mapStateToProps,
  { ...threadActions, ...messageActions }
)(Compose)

export default ComposeContainer
