import React from 'react'
import { Platform, Iframe } from 'react-universal'

const additionalCSS = `
  <style>
    body { margin: 0; padding: 15px; font-size: 16px; font-family: helvetica; box-sizing: border-box; }
  </style>
`

export class FullFrame extends React.Component {
  state = {
    height: 54,
  }
  mount = (e) => {
    const iframe = e.target
    if (e.title) {
      const height = parseInt(e.title, 10)
      if (height > 0) { this.setState({ height }) }
    } else if (iframe) {
      const height = iframe.contentWindow.document.body.scrollHeight
      this.setState({ height })
    }
  }
  render() {
    const mappedProps = Platform.OS === 'web' ? {} : {
      onNavigationStateChange: this.mount,
      injectedJavaScript: 'window.location.hash = 1;document.title = document.height;',
    }
    return (
      <Iframe
        style={{ ...this.props.style, height: this.state.height, display: 'block', flex: 1 }}
        srcDoc={ this.props.body + additionalCSS }
        onLoad={ this.mount }
        { ...mappedProps }
      />
    )
  }
}

export default FullFrame
