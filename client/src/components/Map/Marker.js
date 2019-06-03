import React, { Component } from 'react'

export default class Marker extends Component {
  render() {
    return (
      <div style={{ whiteSpace: 'nowrap', display: 'inline-block', background: this.props.background, color: '#ffffff', padding: '0.2rem' }}>
        {this.props.text}
      </div>
    )
  }
}
