import React, { Component } from "react";
import Meter from "./Meter";
import "./index.css";

export default class Column extends Component {
  ledsForMeter(i) {
    return this.props.leds.slice(i * 4, (i + 1) * 4);
  }

  render() {
    return (
      <div
        className="column"
        style={
          this.props.is3d
            ? {
                transform: `rotateY(${this.props.angle *
                  360}deg) translate3d(0, 0, 15em) `
              }
            : {}
        }
        onClick={this.props.onClick}
      >
        {this.props.proximity && <div className="proximity-indicator" />}
        <div className="double-meter">
          <Meter leds={this.ledsForMeter(0)} />
          <Meter leds={this.ledsForMeter(1)} />
        </div>
        <Meter leds={this.ledsForMeter(2)} />
        <Meter leds={this.ledsForMeter(3)} />
        <Meter leds={this.ledsForMeter(4)} />
        <Meter leds={this.ledsForMeter(5)} />
        <Meter leds={this.ledsForMeter(6)} />
        <Meter leds={this.ledsForMeter(7)} />
        <Meter leds={this.ledsForMeter(8)} />
      </div>
    );
  }
}
