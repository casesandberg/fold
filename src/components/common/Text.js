import React from 'react'
import _ from 'lodash'
import { Platform, Text } from 'react-native'

export const TextComponent = (props) => {
  const Component = Platform.OS === 'web' ? 'span' : Text
  const filteredProps = Platform.OS === 'web' ? _.omit(props, 'numberOfLines') : props
  return <Component { ...filteredProps }>{ props.children }</Component>
}

export default TextComponent
