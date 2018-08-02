// @flow

import Base, { COLS, LEDS_PER_METER, METERS, LEDS } from "../pattern-base";

export default class Cylon extends Base {
  pos: number;
  hue: number;
  climbing: boolean;

  start() {
    this.pos = 0;
    this.hue = 0;
    this.climbing = true;
  }

  valueForPos(ledPos: number): number {
    const val = 255 - this.abs(ledPos - this.pos) * 3; // int
    return this.constrain(val, 0, 255);
  }

  async loop() {
    this.pos += 16 * (this.climbing ? 1 : -1);
    if (this.pos > 247 - 16) this.climbing = false;
    if (this.pos == 0) this.climbing = true;

    this.hue++;

    const val1 = this.valueForPos(0);
    const val2 = this.valueForPos((255 * 1) / 3);
    const val3 = this.valueForPos((255 * 2) / 3);
    const val4 = this.valueForPos(255);

    for (let col = 0; col < COLS; col++) {
      for (let meter = 0; meter < METERS; meter++) {
        const hue = this.hue + this.getX(col, meter);
        if (this.sensors[col]) {
          this.columns[col].meterHSV(meter, hue, 127, 255 - val1, 0b1000);
          this.columns[col].meterHSV(meter, hue, 127, 255 - val2, 0b0100);
          this.columns[col].meterHSV(meter, hue, 127, 255 - val3, 0b0010);
          this.columns[col].meterHSV(meter, hue, 127, 255 - val4, 0b0001);
        } else {
          this.columns[col].meterHSV(meter, hue, 127, val1, 0b1000);
          this.columns[col].meterHSV(meter, hue, 127, val2, 0b0100);
          this.columns[col].meterHSV(meter, hue, 127, val3, 0b0010);
          this.columns[col].meterHSV(meter, hue, 127, val4, 0b0001);
        }
      }
    }

    this.show();

    await this.delay(20);
  }
}
