import { connect } from 'react-redux'
import { selectors } from '../reducers'
import { actions as threadActions } from '../reducers/threads'
import { actions as messageActions } from '../reducers/messages'

import Triage from '../components/Triage'

const mapStateToProps = state => ({
  thread: selectors.getActiveThread(state),
  messages: selectors.getMessagesByThreadID(state, selectors.getActiveThreadID(state)),
  draft: state.messages.drafts[selectors.getActiveThreadID(state)] || {},
  isSidebarVisible: state.app.isSidebarVisible,
  activeEmailDisplay: state.messages.ui.activeEmailDisplay,
})

const TriageContainer = connect(
  mapStateToProps,
  { ...threadActions, ...messageActions }
)(Triage)

export default TriageContainer
