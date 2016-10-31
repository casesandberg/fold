import { connect } from 'react-redux'
import { actions as threadActions, getActiveThread, getActiveThreadID } from '../reducers/threads'
import { actions as messageActions, getMessagesByThreadID } from '../reducers/messages'

import Triage from '../components/Triage'

const mapStateToProps = state => ({
  activeThread: getActiveThread(state),
  activeMessages: getMessagesByThreadID(state, getActiveThreadID(state)),
  activeDraft: state.messages.drafts[getActiveThreadID(state)] || {},
  isSidebarVisible: state.app.isSidebarVisible,
})

const TriageContainer = connect(
  mapStateToProps,
  { ...threadActions, ...messageActions }
)(Triage)

export default TriageContainer
