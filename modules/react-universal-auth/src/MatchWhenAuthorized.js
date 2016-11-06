// TODO: Decouple from App
import React from 'react'
import { connect } from 'react-redux'
import { Match, Redirect } from 'react-router'

export const MatchWhenAuthorized = ({ component: Component, isAuthed, ...rest }) => (
  <Match
    { ...rest }
    render={ () => (
      isAuthed ? (
        <Component />
      ) : (
        <Redirect to="/login" />
      )
    ) }
  />
)

export default connect(state => ({ isAuthed: !!state.app.accessToken }))(MatchWhenAuthorized)
