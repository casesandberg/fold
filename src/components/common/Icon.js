import React from 'react'
import { Path, Svg } from './'

const icons = {
  'clock': 'M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z',
  'folder-outline': 'M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z',
  'menu': 'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z',
}

export const Icon = ({ name }) => {
  const icon = icons[name]
  return (
    <Svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
      <Path fill="#aaa" d={ icon } />
    </Svg>
  )
}

export default Icon
