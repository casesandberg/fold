import { connect } from 'react-redux'
import { selectors } from '../reducers'
import { actions } from '../reducers/app'

import Triage from '../components/Triage'

const mapStateToProps = state => ({
  thread: selectors.getActiveThread(state),
  messages: selectors.getMessagesByThreadID(state, selectors.getActiveThreadID(state)),
  isSidebarVisible: selectors.getSidebarVisibility(state),
})

const TriageContainer = connect(
  mapStateToProps,
  actions
)(Triage)

export default TriageContainer
