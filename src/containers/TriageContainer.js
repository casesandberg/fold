import _ from 'lodash'
import { connect } from 'react-redux'
import { actions as threadActions } from '../reducers/threads'
import { actions as messageActions } from '../reducers/messages'

import Triage from '../components/Triage'

const mapStateToProps = state => ({
  accessToken: state.app.accessToken,
  activeThread: state.threads[0],
  activeMessages: _.remove(state.messages, message =>
    _.includes(state.threads[0].message_ids, message.id)
  ),
})

const TriageContainer = connect(
  mapStateToProps,
  { ...threadActions, ...messageActions }
)(Triage)

export default TriageContainer
