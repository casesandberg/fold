import { connect } from 'react-redux'
import { selectors } from '../reducers'
import { actions } from '../reducers/threads'

import Sidebar from '../components/sidebar/Sidebar'

const mapStateToProps = state => ({
  threads: selectors.getInbox(state),
  activeThreadID: selectors.getActiveThreadID(state),
})

const SidebarContainer = connect(
  mapStateToProps,
  actions
)(Sidebar)

export default SidebarContainer
