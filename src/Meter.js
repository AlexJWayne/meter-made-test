import React, { Component } from 'react'
import Led from './Led'
import './index.css'

export default class Meter extends Component {
  color() {
    const rgb = [
      this.props.leds.reduce((total, v) => total + v[0], 0) / 4 / 2,
      this.props.leds.reduce((total, v) => total + v[1], 0) / 4 / 2,
      this.props.leds.reduce((total, v) => total + v[2], 0) / 4 / 2,
    ]

    return `rgb(${rgb.join(',')})`
  }

  render() {
    return (
      <div className="meter" style={{ backgroundColor: this.color() }}>
        <Led color={this.props.leds[0]} />
        <Led color={this.props.leds[1]} />
        <Led color={this.props.leds[2]} />
        <Led color={this.props.leds[3]} />
      </div>
    )
  }
}
