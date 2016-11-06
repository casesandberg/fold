import React from 'react'
import { Platform, TouchableWithoutFeedback } from 'react-native'

export const Clickable = (props) => {
  const Component = Platform.OS === 'web' ? 'div' : TouchableWithoutFeedback
  const mappedProps = Platform.OS === 'web' ? {} : {
    onPress: props.onClick,
  }
  return (
    <Component
      { ...props }
      style={{ ...props.style, cursor: 'pointer' }}
      { ...mappedProps }
    >
      { props.children }
    </Component>
  )
}

export default Clickable
