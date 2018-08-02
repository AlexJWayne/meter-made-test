// @flow

import React, { Component } from "react";
import mapTimes from "./map-times";
import Column from "./Column";
import patterns from "./patterns";
import PatternBase from "./pattern-base";
import "./index.css";

const INITIAL_PATTERN = "Rainbow";

type State = {
  leds: number[][][],
  sensors: boolean[],
  currentPattern: string,
  is3d: boolean
};

class App extends Component<*, State> {
  pattern: PatternBase;

  constructor(...args: any[]) {
    super(...args);

    const lastPattern = localStorage.getItem("lastPattern");
    const intialPattern =
      lastPattern && patterns[lastPattern] ? lastPattern : INITIAL_PATTERN;

    this.state = {
      leds: mapTimes(10, col => mapTimes(90, led => [0, 0, 0])),
      sensors: mapTimes(10, () => false),
      currentPattern: intialPattern,
      is3d: localStorage.getItem("is3d") !== "false"
    };

    this.onSelectPattern(intialPattern);
  }

  onSelectPattern(name: string) {
    if (this.pattern) this.pattern.stop();

    localStorage.setItem("lastPattern", name);

    const PatternClass = patterns[name];
    this.pattern = new PatternClass(cols => {
      this.setState({
        leds: cols.map(col => col.leds)
      });
    });

    this.pattern.setSensors(this.state.sensors);
    this.pattern.begin();

    this.setState({
      currentPattern: name
    });
  }

  toggleSensor(col: number) {
    const sensors = this.state.sensors.map(
      (sensor, i) => (i === col ? !sensor : sensor)
    );
    this.setState({ sensors });
    this.pattern.setSensors(sensors);
  }

  toggle3d() {
    localStorage.setItem("is3d", !this.state.is3d ? "true" : "false");
    console.log(localStorage.getItem("is3d"));
    this.setState({
      is3d: !this.state.is3d
    });
  }

  render() {
    return (
      <div className="app">
        <ul className="patterns">
          <li
            className={this.state.is3d ? "selected" : ""}
            onClick={() => this.toggle3d()}
          >
            3D
          </li>
          {Object.keys(patterns).map(name => (
            <li
              key={name}
              className={this.state.currentPattern === name ? "selected" : ""}
              onClick={() => this.onSelectPattern(name)}
            >
              {name}
            </li>
          ))}
        </ul>
        <div className={`columns ${this.state.is3d ? "is3d" : ""}`}>
          {this.state.leds.map((leds, i) => {
            return (
              <Column
                key={i}
                leds={leds}
                proximity={this.state.sensors[i]}
                angle={i / 10}
                is3d={this.state.is3d}
                onClick={() => this.toggleSensor(i)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
