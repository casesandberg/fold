import { connect } from 'react-redux'
import { getActiveThread } from '../reducers/threads'
import { actions } from '../reducers/app'

import Header from '../components/Header'

const mapStateToProps = state => ({
  activeThread: getActiveThread(state),
})

const HeaderContainer = connect(
  mapStateToProps,
  actions
)(Header)

export default HeaderContainer
