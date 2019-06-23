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
        this.columns[col].meterHSV(i, hue, 255, 255);
      }
    }

    this.show();

    await this.delay(25);
  }
}
