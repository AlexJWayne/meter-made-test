import React, { Component } from "react";
import Meter from "./Meter";
import "./index.css";

export default class Column extends Component {
  render() {
    const angle = 180 + this.props.angle * 360;
    return (
      <div
        className="column"
        style={
          this.props.is3d
            ? {
                transform: `
                  rotateY(${angle}deg)
                  translate3d(0, 0, 15.5em)
                `
              }
            : {}
        }
        onClick={this.props.onClick}
      >
        {this.props.proximity && <div className="proximity-indicator" />}
        <div className="double-meter">
          <Meter index={0} leds={this.props.leds} is3d={this.props.is3d} />
          <Meter index={1} leds={this.props.leds} is3d={this.props.is3d} />
        </div>
        <Meter index={2} leds={this.props.leds} is3d={this.props.is3d} />
        <Meter index={3} leds={this.props.leds} is3d={this.props.is3d} />
        <Meter index={4} leds={this.props.leds} is3d={this.props.is3d} />
        <Meter index={5} leds={this.props.leds} is3d={this.props.is3d} />
        <Meter index={6} leds={this.props.leds} is3d={this.props.is3d} />
        <Meter index={7} leds={this.props.leds} is3d={this.props.is3d} />
        <Meter index={8} leds={this.props.leds} is3d={this.props.is3d} />
      </div>
    );
  }
}
