import { connect } from 'react-redux'
import { selectors } from '../reducers'
import { actions as threadActions } from '../reducers/threads'
import { actions as messageActions } from '../reducers/messages'

import Compose from '../components/compose/Compose'

const mapStateToProps = state => ({
  thread: selectors.getActiveThread(state),
  draft: state.messages.drafts[selectors.getActiveThreadID(state)] || {},
  isReplyFocused: state.messages.ui.isReplyFocused,
})

const ComposeContainer = connect(
  mapStateToProps,
  { ...threadActions, ...messageActions }
)(Compose)

export default ComposeContainer
