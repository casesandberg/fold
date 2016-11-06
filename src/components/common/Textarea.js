import React from 'react'
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
    return (
      <Component
        { ...this.props }
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
