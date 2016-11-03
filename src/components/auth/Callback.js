import React from 'react'
import { connect } from 'react-redux'
import { actions } from 'redux-nylas-middleware'
import { getFromURI } from '../../helpers/uri'
import { Text } from '../common'

export const Callback = ({ setToken }) => {
  const token = getFromURI('access_token')
  setToken(token)

  return token ? (
    <Redirect to="/" />
  ) : (
    <Redirect to="/login" />
  )
}

export default connect(() => ({}), actions)(Callback)
