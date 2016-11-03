import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import createNylas from 'redux-nylas-middleware'
import { Platform, AsyncStorage } from 'react-native'
import rootReducer from '../reducers'


const logger = createLogger({ level: 'info', collapsed: true })
const nylas = createNylas({ storage: Platform.OS === 'web' ? localStorage : AsyncStorage })

const enhancer = compose(
  applyMiddleware(
    thunk,
    nylas,
    logger,
  )
)

const nativeToken = typeof AsyncStorage !== 'undefined' &&
  AsyncStorage.getItem('access_token')
const token = typeof localStorage !== 'undefined' && localStorage.getItem('access_token')
const state = { app: { accessToken: token || nativeToken } }
export default function configureStore(initialState = state) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (window.devToolsExtension) {
    window.devToolsExtension.updateStore(store)
  }

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    )
  }

  return store
}
