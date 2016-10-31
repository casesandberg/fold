import React from 'react'
import { Platform } from 'react-native'
import Svg from 'react-native-svg'

export const SvgComponent = (props) => {
  const Component = Platform.OS === 'web' ? 'svg' : Svg
  return <Component { ...props }>{ props.children }</Component>
}

export default SvgComponent
