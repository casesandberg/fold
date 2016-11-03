import React from 'react'
import reactCSS from 'reactcss'
import { Platform, Linking } from 'react-native'
import { objToString } from '../../helpers/uri'

import { Box, Clickable, Text } from '../common'

export class Login extends React.Component {
  state = {
    urlParams: null,
  }
  componentDidMount() {  // eslint-disable-line
    const handleUrl = (e) => {
      const url = e.url.replace('fold://callback', '')
      this.context.router.transitionTo(`/callback${ url }`)
      Linking.removeEventListener('url', handleUrl)
    }
    Linking.addEventListener('url', handleUrl)
  }
  render() { // eslint-disable-line
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
          paddingRight: 15,
          paddingLeft: 15,
          fontSize: 15,
          color: '#aaa',
          textDecoration: 'none',
          fontWeight: 'bold',
        },
      },
    })

    const auth = {
      client_id: '7vv3n35607oxmk8ztn1jpwghc',
      response_type: 'token',
      scope: 'email',
      login_hint: 'case@casesandberg.com',
      redirect_uri: Platform.OS === 'web' ? 'http://localhost:8517/callback' : 'fold://callback',
    }

    const url = `https://api.nylas.com/oauth/authorize?${ objToString(auth) }`

    return (
      <Box style={ styles.page }>
        { Platform.OS === 'web' ? (
          <a style={ styles.button } href={ url }>
            Sign In
          </a>
        ) : (
          <Clickable onClick={ () => Linking.openURL(url) }>
            <Box style={ styles.button }>
              <Text>Sign In</Text>
            </Box>
          </Clickable>
        ) }
      </Box>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object,
}

export default Login
