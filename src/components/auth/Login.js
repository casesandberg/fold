import React from 'react'
import reactCSS from 'reactcss'

import { objToString } from '../../helpers/uri'

export const Login = () => {
  const styles = reactCSS({
    'default': {
      page: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        height: 54,
        borderRadius: 2,
        background: '#ddd',
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 15px',
        fontSize: 15,
        color: '#aaa',
        textDecoration: 'none',
        fontWeight: 600,
      },
    },
  })

  const auth = {
    client_id: '7vv3n35607oxmk8ztn1jpwghc',
    response_type: 'token',
    scope: 'email',
    login_hint: 'case@casesandberg.com',
    redirect_uri: 'http://localhost:8517/callback',
  }

  return (
    <div style={ styles.page }>
      <a
        style={ styles.button }
        href={ `https://api.nylas.com/oauth/authorize?${ objToString(auth) }` }
      >
        Sign In
      </a>
    </div>
  )
}

export default Login
