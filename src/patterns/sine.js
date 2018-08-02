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
        const sin = this.sin8(x - this.val * (this.sensors[col] ? 8 : 1));

        let val = this.constrain(255 - this.abs(y - sin), 0, 255);
        val = this.map(val, 180, 230, 0, 255);
        val = this.constrain(val, 0, 255);

        this.columns[col].meterHSV(meter, this.hue + x, 255, val);
      }
    }

    this.show();

    await this.delay(25);
  }
}
