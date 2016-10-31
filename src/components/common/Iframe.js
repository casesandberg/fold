import React from 'react'
import { Platform, WebView } from 'react-native'

export const Iframe = (props) => {
  const Component = Platform.OS === 'web' ? 'iframe' : WebView
  return <Component { ...props } source={{ html: props.srcDoc }} />
}

export default Iframe
