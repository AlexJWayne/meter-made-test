import Base, { COLS, METERS } from "../pattern-base";

export default class Rainbow extends Base {
  constructor(...args) {
    super(...args);
  }

  start() {
    this.hue = 0;
  }

  async loop() {
    // Advance hue for this next frame.
    this.hue -= 2;

    for (let col = 0; col < COLS; col++) {
      // Make the colors whiter if the sensor is triggered.
      const sat = this.sensors[col] ? 64 : 255;

      for (let i = 0; i < METERS; i++) {
        const hue = this.hue + this.getX(col, i) + this.getY(col, i);
        this.columns[col].meterHSV(i, hue, sat, 255);
      }
    }

    this.show();

    await this.delay(25);
  }
}
