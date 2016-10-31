import React from 'react'
import { Platform, Text } from 'react-native'

export const TextComponent = (props) => {
  const Component = Platform.OS === 'web' ? 'span' : Text
  return <Component { ...props }>{ props.children }</Component>
}

export default TextComponent
