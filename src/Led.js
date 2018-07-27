import React, { Component } from 'react'
import './index.css'

export default class Led extends Component {
  color() {
    return `rgb(${this.props.color.join(',')})`
  }

  render() {
    return <span className="led" style={{ backgroundColor: this.color() }} />
  }
}
