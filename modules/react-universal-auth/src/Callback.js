// TODO: Decouple from App
import React from 'react'
import { Platform, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { actions } from 'redux-nylas-middleware'
import { Redirect } from 'react-router'
import { getFromURI } from './helpers/uri'

export const Callback = ({ setToken, location }) => {
  const token = getFromURI('access_token') || (location.query &&
    location.query.access_token)
  const storage = Platform.OS === 'web' ? localStorage : AsyncStorage
  storage.setItem('access_token', token)
  setToken(token)

  return token ? (
    <Redirect to="/" />
  ) : (
    <Redirect to="/login" />
  )
}

export default connect(() => ({}), actions)(Callback)
