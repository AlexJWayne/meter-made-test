// @flow

import Base, { COLS, LEDS_PER_METER, METERS, LEDS } from "../pattern-base";

import mapTimes from "../map-times";
export default class Rings extends Base {
  hue: number; // uint8_t
  pos: number; // int
  speed: number; // int

  sinInput: number; // uint16_t

  start() {
    this.hue = 0;
    this.pos = 127;
    this.speed = -5;

    this.sinInput = 0;
  }

  async loop() {
    const start = performance.now();

    const margin = 80;

    this.hue++;
    this.sinInput += 60;

    this.pos += this.speed;
    if (this.pos > 255 + margin) this.pos -= 256 + margin * 2;
    if (this.pos < 0 - margin) this.pos += 256 + margin * 2;

    this.speed = this.map(this.sin8(this.sinInput >> 8), 0, 255, -30, 30);

    for (let col = 0; col < COLS; col++) {
      for (let meter = 0; meter < METERS; meter++) {
        const y = this.getY(col, meter);

        let distance = this.constrain(255 - this.abs(y - this.pos), 0, 255);

        let val = this.map(distance, 190, 250, 0, 255);
        val = this.constrain(val, 0, 255);

        this.columns[col].meterHSV(meter, this.hue, 255, val);

        // Flicker center of column when you get close.
        if (this.sensors[col]) {
          this.columns[col].meterHSV(
            meter,
            this.hue,
            this.random(64, 255),
            this.random(190, 255),
            0b0110
          );
        }
      }
    }

    this.show();

    await this.delay(20);
  }
}
