import React from 'react'
import { Platform, TextInput } from 'react-native'

export const Input = (props) => {
  const Component = Platform.OS === 'web' ? 'input' : TextInput
  const mappedProps = Platform.OS === 'web' ? {} : {
    onChangeText: props.onChange,
  }
  return <Component { ...props } { ...mappedProps }>{ props.children }</Component>
}

export default Input
