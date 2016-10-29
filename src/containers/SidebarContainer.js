import { connect } from 'react-redux'
import { actions } from '../reducers/threads'

import Sidebar from '../components/sidebar/Sidebar'

const mapStateToProps = state => ({
  threads: state.threads.threads,
  activeThreadID: state.threads.activeThreadID,
})

const SidebarContainer = connect(
  mapStateToProps,
  actions
)(Sidebar)

export default SidebarContainer
