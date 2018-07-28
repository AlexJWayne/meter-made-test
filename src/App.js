import React, { Component } from 'react'
import mapTimes from './map-times'
import Column from './Column'
import './index.css'

// Import pattern here
import Pattern from './patterns/rainbow'

class App extends Component {
  constructor(...args) {
    super(...args)

    this.pattern = new Pattern({
      showAllColumns: cols => {
        this.setState({
          leds: cols.map(col => col.leds),
        })
      },
    })

    this.pattern.start()

    this.state = {
      leds: mapTimes(10, col => mapTimes(90, led => [0, 0, 0])),
      sensors: mapTimes(10, () => false),
    }
  }

  onShowColumn(col, colLeds) {
    this.setState = {
      leds: colLeds.map((leds, i) => (i === col ? colLeds : leds)),
    }
  }

  toggleSensor(col) {
    const sensors = this.state.sensors.map((sensor, i) => (i === col ? !sensor : sensor))
    this.setState({ sensors })
    this.pattern.setSensors(sensors)
  }

  render() {
    return (
      <div className="app">
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
