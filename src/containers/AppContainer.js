import { connect } from 'react-redux'
import { actions } from 'redux-nylas-middleware'

import App from '../components/App'

const mapStateToProps = state => ({
  isAuthed: !!state.app.accessToken,
})

const AppContainer = connect(
  mapStateToProps,
  actions
)(App)

export default AppContainer
