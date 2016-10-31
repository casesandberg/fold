import { connect } from 'react-redux'
import { selectors } from '../reducers'
import { actions as threadActions } from '../reducers/threads'
import { actions as messageActions } from '../reducers/messages'

import Triage from '../components/Triage'

const mapStateToProps = state => ({
  activeThread: selectors.getActiveThread(state),
  activeMessages: selectors.getMessagesByThreadID(state, selectors.getActiveThreadID(state)),
  activeDraft: state.messages.drafts[selectors.getActiveThreadID(state)] || {},
  isSidebarVisible: state.app.isSidebarVisible,
})

const TriageContainer = connect(
  mapStateToProps,
  { ...threadActions, ...messageActions }
)(Triage)

export default TriageContainer
