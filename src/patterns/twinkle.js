// @flow

import mapTimes from "../map-times";
import Base, { COLS, LEDS_PER_METER, METERS, LEDS } from "../pattern-base";

export default class Twinkle extends Base {
  hue: number;
  twinkles: number[];

  start() {
    this.hue = 0;
    this.twinkles = mapTimes(COLS * METERS, () => 0);
  }

  async loop() {
    this.hue++;
    if (this.hue > 255) this.hue = 255;

    // Even values count down, odd counts up.
    for (let meter = 0; meter < COLS * METERS; meter++) {
      let val = this.twinkles[meter];
      if (val > 0) {
        if (val == 255) {
          val--;
        } else if (val % 2 == 0) {
          val -= 2;
        } else {
          val += 2;
        }
        this.twinkles[meter] = val;
      }
    }

    // Base rate twinkles.
    if (this.random(100) <= 10) {
      const newTwinkleIndex = this.random(COLS * METERS);
      if (this.twinkles[newTwinkleIndex] == 0) {
        this.twinkles[newTwinkleIndex] = 1;
      }
    }

    // Set all leds colors.
    for (let col = 0; col < COLS; col++) {
      for (let meter = 0; meter < METERS; meter++) {
        this.columns[col].meterHSV(
          meter,
          this.hue + this.getX(col, meter) * 4 + this.getY(col, meter) * 4,
          92,
          this.twinkles[METERS * col + meter]
        );
      }
    }

    this.show();
    await this.delay(5);
  }
}
