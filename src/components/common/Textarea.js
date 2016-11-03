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
    return (
      <Component
        { ...this.props }
        ref={ t => this.textarea = t }
        onChange={ handleChange }
        onChangeText={ this.props.onChange }
      >
        { this.props.children }
      </Component>
    )
  }
}

export default Textarea
