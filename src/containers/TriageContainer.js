import { connect } from 'react-redux'
import { actions as threadActions, getActiveThread } from '../reducers/threads'
import { actions as messageActions, getMessagesByThreadID } from '../reducers/messages'

import Triage from '../components/Triage'

const mapStateToProps = state => ({
  activeThread: getActiveThread(state),
  activeMessages: getMessagesByThreadID(state, state.threads.activeThreadID),
  isSidebarVisible: state.app.isSidebarVisible,
})

const TriageContainer = connect(
  mapStateToProps,
  { ...threadActions, ...messageActions }
)(Triage)

export default TriageContainer
