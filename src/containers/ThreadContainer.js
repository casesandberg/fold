import { connect } from 'react-redux'
import { selectors } from '../reducers'
import { actions as threadActions } from '../reducers/threads'
import { actions as messageActions } from '../reducers/messages'

import Thread from '../components/Thread'

const mapStateToProps = state => ({
  thread: selectors.getActiveThread(state),
  messages: selectors.getMessagesByThreadID(state, selectors.getActiveThreadID(state)),
  activeEmailDisplay: state.messages.ui.activeEmailDisplay,
})

const ThreadContainer = connect(
  mapStateToProps,
  { ...threadActions, ...messageActions }
)(Thread)

export default ThreadContainer
