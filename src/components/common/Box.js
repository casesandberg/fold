import React from 'react'
import { Platform, View } from 'react-native'

export const Box = (props) => {
  const Component = Platform.OS === 'web' ? 'div' : View
  return <Component { ...props }>{ props.children }</Component>
}

export default Box
