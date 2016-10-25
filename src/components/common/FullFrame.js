import React from 'react'

export class FullFrame extends React.Component {
  mount = () => {
    const iframe = this.iframe
    // iframe.contentWindow.document.body.style.padding = '0px'
    iframe.style.height = `${ iframe.contentWindow.document.body.scrollHeight }px`
  }
  render() {
    return (
      <iframe
        ref={ (i) => { this.iframe = i } }
        style={ this.props.style }
        srcDoc={ this.props.body }
        onLoad={ this.mount }
      />
    )
  }
}

export default FullFrame
