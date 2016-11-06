import React from 'react'
import _ from 'lodash'
import { Platform, View } from 'react-native'

export const Box = (props) => {
  const Component = Platform.OS === 'web' ? 'div' : View
  const filteredProps = Platform.OS === 'web' ? props : {
    ...props,
    style: _.omit(props.style, ['display', 'boxSizing', 'WebkitBoxFlex',
      'MozBoxFlex', 'WebkitFlex', 'msFlex', 'fontFamily', 'fontSize',
      'WebkitJustifyContent', 'background', 'msBoxShadow', 'MozBoxShadow',
      'OBoxShadow', 'WebkitBoxShadow', 'boxShadow', 'msTransition', 'MozTransition',
      'OTransition', 'WebkitTransition', 'transition', 'msBorderRadius',
      'MozBorderRadius', 'OBorderRadius', 'WebkitBorderRadius', 'cursor',
      'textTransform', 'color', 'textDecoration', 'fontWeight']),
  }
  return <Component { ...filteredProps }>{ props.children }</Component>
}

export default Box
