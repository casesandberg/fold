import React from 'react'
import { Match } from 'react-router'

import Callback from './src/Callback'
import Login from './src/Login'

export const AuthComponents = [
  <Match pattern="/callback" key="callback" component={ Callback } />,
  <Match pattern="/login" key="login" component={ Login } />,
]

export MatchWhenAuthorized from './src/MatchWhenAuthorized'
