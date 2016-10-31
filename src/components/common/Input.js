import React from 'react'
import { Platform, TextInput } from 'react-native'

export const Input = (props) => {
  const Component = Platform.OS === 'web' ? 'input' : TextInput
  return <Component { ...props } onChangeText={ props.onChange }>{ props.children }</Component>
}

export default Input
