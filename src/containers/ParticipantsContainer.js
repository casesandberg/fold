import { connect } from 'react-redux'
import { selectors } from '../reducers'

import Participants from '../components/common/Participants'

const mapStateToProps = state => ({
  account: selectors.getAccount(state),
})

const ParticipantsContainer = connect(
  mapStateToProps
)(Participants)

export default ParticipantsContainer
