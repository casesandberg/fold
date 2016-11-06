import React from 'react'
import { Platform, WebView } from 'react-native'

export const Iframe = (props) => {
  const Component = Platform.OS === 'web' ? 'iframe' : WebView
  const mappedProps = Platform.OS === 'web' ? {} : {
    source: { html: props.srcDoc },
  }
  return <Component { ...props } { ...mappedProps } />
}

export default Iframe
