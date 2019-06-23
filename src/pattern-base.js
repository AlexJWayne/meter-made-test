// @flow

import mapTimes from "./map-times";
import hsv from "./hsv";
import PatternColumn from "./pattern-column";

export const COLS = 10;
export const LEDS_PER_METER = 4;
export const METERS = 9;
export const LEDS = LEDS_PER_METER * METERS;

export default class Pattern {
  columns: PatternColumn[];
  running: boolean;
  show: () => void;

  constructor(showAllColumns: (PatternColumn[]) => void) {
    this.running = false;
    this.show = () => showAllColumns(this.columns);
    this.columns = mapTimes(COLS, i => new PatternColumn());
  }

  begin() {
    this.running = true;
    this.start();
    setTimeout(async () => {
      while (this.running) {
        await this.loop();
        await this.delay(1);
      }
    }, 10);
  }

  // Optionally, override.
  start() {}

  stop() {
    this.running = false;
  }

  // Override
  async loop() {
    // Do nothing...
    await this.delay(100);
  }

  // Utility functions for use in patterns
  // -------------------------------------

  // Pause execution. Call with `await`.
  delay(ms: number): Promise<*> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Return an 8 bit sine value based on an 8 bit input.
  sin8(n: number): number {
    n %= 256;
    if (n < 0) n + 256;

    const sin = Math.sin((n / 256) * 2 * Math.PI);
    return Math.round(((sin + 1) / 2) * 255);
  }

  // Return an 8 bit cosine value based on an 8 bit input.
  cos8(n: number): number {
    n %= 256;
    if (n < 0) n + 256;

    const sin = Math.cos((n / 256) * 2 * Math.PI);
    return Math.round(((sin + 1) / 2) * 255);
  }

  // Re-maps a number from one range to another.
  // https://www.arduino.cc/reference/en/language/functions/math/map/
  map(
    x: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number
  ): number {
    return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  }

  // Return a random integer. Call with either `random(max)` or `random(min, max)`.
  // https://www.arduino.cc/reference/en/language/functions/random-numbers/random/
  random(...args: number[]): number {
    let min, max;
    if (args.length === 1) {
      min = 0;
      max = args[0];
    } else {
      [min, max] = args;
    }

    return Math.floor(Math.random() * (max - min) + min);
  }

  // https://www.arduino.cc/reference/en/language/functions/math/abs/
  abs(n: number): number {
    return Math.abs(n);
  }

  // Constrains a number to be within a range.
  // https://www.arduino.cc/reference/en/language/functions/math/constrain/
  constrain(n: number, min: number, max: number): number {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  // Return an 8 bit x coordinate a column and meter index.
  getX(col: number, meter: number): number {
    let offset = 0;
    if (meter <= 1) offset = 255 / COLS / 3;
    if (meter == 0) offset = -offset;

    let x = offset + (col * 255) / COLS;
    if (x < 0) x += 256;
    return Math.round(x);
  }

  // Return an 8 bit y coordinate a column and meter index.
  getY(col: number, meter: number): number {
    if (meter <= 1) return 255;
    return Math.round(((METERS - meter - 1) * 255) / (METERS - 2));
  }
}
