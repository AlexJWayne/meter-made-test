import React, { Component } from "react";
import Led from "./Led";
import "./index.css";

export default class Meter extends Component {
  getLeds() {
    const meter = this.props.index;
    return this.props.leds.slice(meter * 4, (meter + 1) * 4);
  }

  color() {
    const leds = this.getLeds();
    const rgb = [
      (leds.reduce((total, v) => total + v[0], 0) / 4) * 0.8,
      (leds.reduce((total, v) => total + v[1], 0) / 4) * 0.8,
      (leds.reduce((total, v) => total + v[2], 0) / 4) * 0.8
    ];

    return `rgb(${rgb.join(",")})`;
  }

  render() {
    const leds = this.getLeds();
    const upness = Math.pow(
      this.props.index <= 1 ? 1 : (8 - (this.props.index - 2)) / 9,
      2
    );
    const angle = upness * -30;
    const outness = upness * 8 - 8;
    return (
      <div
        className="meter"
        style={{
          backgroundColor: this.color(),
          transform: this.props.is3d
            ? `
                  translate3d(0, 0, ${outness}em)
                  rotateX(${angle}deg)
                  scale(0.8, 0.8)
                `
            : "none"
        }}
      >
        <Led color={leds[0]} />
        <Led color={leds[1]} />
        <Led color={leds[2]} />
        <Led color={leds[3]} />
      </div>
    );
  }
}
