import React from 'react'
import _ from 'lodash'
import { Platform } from 'react-native'
import Svg from 'react-native-svg'

export const SvgComponent = (props) => {
  const Component = Platform.OS === 'web' ? 'svg' : Svg
  const filteredProps = Platform.OS === 'web' ? props : {
    ...props,
    style: _.omit(props.style, ['msTransition', 'MozTransition', 'OTransition',
      'WebkitTransition', 'transition']),
  }
  return <Component { ...filteredProps }>{ props.children }</Component>
}

export default SvgComponent
