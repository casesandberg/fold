import React from 'react'
import _ from 'lodash'
import { Platform, TextInput } from 'react-native'

export class Textarea extends React.Component {
  render() {
    const Component = Platform.OS === 'web' ? 'textarea' : TextInput
    const handleChange = (e) => {
      if (this.textarea) {
        this.textarea.style.height = '0px'
        this.textarea.style.height = `${ e.target.scrollHeight }px`
      }
      // this.setState({ height })
      this.props.onChange(e)
    }
    const mappedProps = Platform.OS === 'web' ? {} : {
      onChangeText: this.props.onChange,
    }

    const filteredProps = Platform.OS === 'web' ? this.props : {
      ...this.props,
      style: _.omit(this.props.style, ['border', 'boxSizing', 'outline', 'resize',
        'WebkitBoxFlex', 'MozBoxFlex', 'WebkitFlex', 'msFlex', 'background']),
    }

    return (
      <Component
        { ...filteredProps }
        ref={ t => this.textarea = t }
        onChange={ handleChange }
        { ...mappedProps }
      >
        { this.props.children }
      </Component>
    )
  }
}

export default Textarea
