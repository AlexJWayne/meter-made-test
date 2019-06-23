// @flow

import Base, { COLS, LEDS_PER_METER, METERS, LEDS } from "../pattern-base";

import mapTimes from "../map-times";
export default class Sine extends Base {
  hue: number;
  val: number;

  start() {
    this.hue = 0;
    this.val = 0;
  }

  async loop() {
    this.hue += 1;
    this.val += 2;

    for (let col = 0; col < COLS; col++) {
      for (let meter = 0; meter < METERS; meter++) {
        const x = this.getX(col, meter);
        const y = this.getY(col, meter);
        const sin = this.sin8(x - this.val);

        let distance = this.constrain(255 - this.abs(y - sin), 0, 255);

        let val = this.map(distance, 140, 200, 0, 255);
        val = this.constrain(val, 0, 255);

        // Give a thin whitened core.
        let sat = this.map(distance, 200, 255, 255, 64);
        sat = this.constrain(sat, 0, 255);

        this.columns[col].meterHSV(meter, this.hue + x, sat, val);
      }
    }

    this.show();

    await this.delay(25);
  }
}
