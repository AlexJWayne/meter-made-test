// @flow

import React, { Component } from 'react'
import mapTimes from './map-times'
import Column from './Column'
import patterns from './patterns'
import PatternBase from './pattern-base'
import './index.css'

const INITIAL_PATTERN = 'Rainbow'

type State = {
  leds: number[][][],
  sensors: boolean[],
  currentPattern: string,
}

class App extends Component<*, State> {
  pattern: PatternBase

  constructor(...args: any[]) {
    super(...args)

    const lastPattern = localStorage.getItem('lastPattern')
    const intialPattern = lastPattern && patterns[lastPattern] ? lastPattern : INITIAL_PATTERN

    this.state = {
      leds: mapTimes(10, col => mapTimes(90, led => [0, 0, 0])),
      sensors: mapTimes(10, () => false),
      currentPattern: intialPattern,
    }

    this.onSelectPattern(intialPattern)
  }

  onSelectPattern(name: string) {
    if (this.pattern) this.pattern.stop()

    localStorage.setItem('lastPattern', name)

    const PatternClass = patterns[name]
    this.pattern = new PatternClass(cols => {
      this.setState({
        leds: cols.map(col => col.leds),
      })
    })

    this.pattern.setSensors(this.state.sensors)
    this.pattern.begin()

    this.setState({
      currentPattern: name,
    })
  }

  toggleSensor(col: number) {
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
