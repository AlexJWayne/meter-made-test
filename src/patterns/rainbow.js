import Base, { COLS, METERS } from "../pattern-base";

export default class Rainbow extends Base {
  start() {
    this.hue = 0;
  }

  async loop() {
    // Advance hue for this next frame.
    this.hue -= 2;

    for (let col = 0; col < COLS; col++) {
      for (let i = 0; i < METERS; i++) {
        let hue = this.hue + this.getX(col, i) + this.getY(col, i);

        if (this.sensors[col]) {
          hue = 255 - hue;
          this.columns[col].meterHSV(i, hue + 255 * (0 / 4), 255, 255, 0b1000);
          this.columns[col].meterHSV(i, hue + 255 * (1 / 4), 255, 255, 0b0100);
          this.columns[col].meterHSV(i, hue + 255 * (2 / 4), 255, 255, 0b0010);
          this.columns[col].meterHSV(i, hue + 255 * (3 / 4), 255, 255, 0b0001);
        } else {
          this.columns[col].meterHSV(i, hue, 255, 255);
        }
      }
    }

    this.show();

    await this.delay(25);
  }
}
