import React from 'react'

import FullFrame from '../common/FullFrame'

export class Messages extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: props.unread || props.last,
    }
  }

  handleExpand = () => {
    this.setState({ isExpanded: true })
  }

  render() {
    const { body, from, snippet } = this.props
    return (
      <div
        style={{
          border: '1px solid #eee',
          marginBottom: '-1px',
          fontSize: '15px',
        }}
      >
        { this.state.isExpanded ? (
          <FullFrame
            style={{ border: 'none', width: '100%', height: 'auto' }}
            body={ body }
          />
        ) : (
          <div
            style={{
              width: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              padding: '15px',
              cursor: 'pointer',
            }}
            onClick={ this.handleExpand }
          >
            <span>{ from[0].name } </span>
            <span style={{ color: '#999' }}>{ snippet }</span>
          </div>
        ) }
      </div>
    )
  }
}

export default Messages
