import { connect } from 'react-redux'
import { actions as threadActions, getThreadByID } from '../reducers/threads'
import { actions as messageActions, getMessagesByThreadID } from '../reducers/messages'

import Triage from '../components/Triage'

const mapStateToProps = state => ({
  accessToken: state.app.accessToken,
  threads: state.threads,
  activeThread: getThreadByID(state, state.app.activeThreadID),
  activeMessages: getMessagesByThreadID(state, state.app.activeThreadID),
  activeThreadID: state.app.activeThreadID,
})

const TriageContainer = connect(
  mapStateToProps,
  { ...threadActions, ...messageActions }
)(Triage)

export default TriageContainer
