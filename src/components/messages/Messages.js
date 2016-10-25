import React from 'react'

export class Triage extends React.Component {
  componentDidMount() {
    this.props.getMessages(this.props.accessToken, this.props.activeThread.message_ids)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.activeThread.id !== nextProps.activeThread.id) {
      this.props.getMessages(nextProps.accessToken, nextProps.activeThread.message_ids)
    }
  }
  render() {
    const { activeMessages } = this.props
    return (
      <div>
        { activeMessages.map((message) => {
          return (
            <div key={ message.id }>
              <div>{ message.snippet }</div>
              <iframe
                style={{ border: 'none', width: '100%', height: '300px' }}
                srcDoc={ message.body }
              />
            </div>
          )
        }) }
      </div>
    )
  }
}

export default Triage
