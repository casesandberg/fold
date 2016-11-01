import { connect } from 'react-redux'
import { selectors } from '../reducers'
import { actions } from '../reducers/app'

import Header from '../components/Header'

const mapStateToProps = state => ({
  title: selectors.getActiveThread(state).subject,
})

const HeaderContainer = connect(
  mapStateToProps,
  actions
)(Header)

export default HeaderContainer
