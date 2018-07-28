import React, { Component } from 'react'
import mapTimes from './map-times'
import Column from './Column'
import patterns from './patterns'
import './index.css'

const INITIAL_PATTERN = 'Rainbow'

class App extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      leds: mapTimes(10, col => mapTimes(90, led => [0, 0, 0])),
      sensors: mapTimes(10, () => false),
      currentPattern: INITIAL_PATTERN,
    }

    this.onSelectPattern(INITIAL_PATTERN)
  }

  onShowColumn(col, colLeds) {
    this.setState = {
      leds: colLeds.map((leds, i) => (i === col ? colLeds : leds)),
    }
  }

  onSelectPattern(name) {
    if (this.pattern) this.pattern.stop()

    const PatternClass = patterns[name]

    this.pattern = new PatternClass({
      showAllColumns: cols => {
        this.setState({
          leds: cols.map(col => col.leds),
        })
      },
    })

    this.pattern.setSensors(this.state.sensors)
    this.pattern.start()

    this.setState({
      currentPattern: name,
    })
  }

  toggleSensor(col) {
    const sensors = this.state.sensors.map((sensor, i) => (i === col ? !sensor : sensor))
    this.setState({ sensors })
    this.pattern.setSensors(sensors)
  }

  render() {
    return (
      <div className="app">
        <ul className="patterns">
          {Object.keys(patterns).map(name => (
            <li
              key={name}
              className={this.state.currentPattern === name ? 'selected' : ''}
              onClick={() => this.onSelectPattern(name)}
            >
              {name}
            </li>
          ))}
        </ul>
        {this.state.leds.map((leds, i) => {
          return (
            <Column
              key={i}
              leds={leds}
              proximity={this.state.sensors[i]}
              onClick={() => this.toggleSensor(i)}
            />
          )
        })}
      </div>
    )
  }
}

export default App
