import React from 'react'
import { Platform, TouchableWithoutFeedback } from 'react-native'

export const Clickable = (props) => {
  const Component = Platform.OS === 'web' ? 'div' : TouchableWithoutFeedback
  return (
    <Component
      { ...props }
      style={{ ...props.style, cursor: 'pointer' }}
      onPress={ props.onClick }
    >
      { props.children }
    </Component>
  )
}

export default Clickable
