import React from 'react'
import { Platform } from 'react-native'
import { Path } from 'react-native-svg'

export const PathComponent = (props) => {
  const Component = Platform.OS === 'web' ? 'path' : Path
  return <Component { ...props }>{ props.children }</Component>
}

export default PathComponent
