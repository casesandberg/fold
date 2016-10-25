import { connect } from 'react-redux'
import { actions } from '../reducers/app'

import App from '../components/App'

const mapStateToProps = state => ({
  isAuthed: !!state.app.accessToken,
})

const AppContainer = connect(
  mapStateToProps,
  actions
)(App)

export default AppContainer
