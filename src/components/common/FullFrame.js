import React from 'react'

const additionalCSS = `
  <style>
    body { margin: 0; padding: 15px; font-style: 16px; font-family: helvetica; box-sizing: border-box; }
  </style>
`

export class FullFrame extends React.Component {
  mount = () => {
    const iframe = this.iframe
    iframe.style.height = `${ iframe.contentWindow.document.body.scrollHeight }px`
  }
  render() {
    return (
      <iframe
        ref={ (i) => { this.iframe = i } }
        style={ this.props.style }
        srcDoc={ this.props.body + additionalCSS }
        onLoad={ this.mount }
      />
    )
  }
}

export default FullFrame
