import { connect } from 'react-redux'
import { getActiveThread } from '../reducers/threads'

import Header from '../components/Header'

const mapStateToProps = state => ({
  activeThread: getActiveThread(state),
})

const HeaderContainer = connect(
  mapStateToProps
)(Header)

export default HeaderContainer
