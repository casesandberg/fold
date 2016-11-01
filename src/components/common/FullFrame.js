import React from 'react'

import Iframe from './Iframe'

const additionalCSS = `
  <style>
    body { margin: 0; padding: 15px; font-style: 16px; font-family: helvetica; box-sizing: border-box; }
  </style>
`

export class FullFrame extends React.Component {
  state = {
    height: 1,
  }
  mount = (e) => {
    const iframe = e.target
    if (iframe) {
      const height = iframe.contentWindow.document.body.scrollHeight
      this.setState({ height })
    } if (e.title) {
      const height = parseInt(e.title, 10)
      if (height > 0) { this.setState({ height }) }
    }
  }
  render() {
    return (
      <Iframe
        style={{ ...this.props.style, height: this.state.height }}
        srcDoc={ this.props.body + additionalCSS }
        onLoad={ this.mount }
        onNavigationStateChange={ this.mount }
        injectedJavaScript="window.location.hash = 1;document.title = document.height;"
      />
    )
  }
}

export default FullFrame
