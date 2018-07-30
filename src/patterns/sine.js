// @flow

import Base, {
  NUM_COLUMNS,
  NUM_LEDS_PER_METER,
  NUM_METERS_PER_COLUMN,
  NUM_LEDS_PER_COLUMN,
} from '../pattern-base'

import mapTimes from '../map-times'
export default class Sine extends Base {
  hue: number
  val: number

  start() {
    this.hue = 0
    this.val = 0
  }

  async loop() {
    this.hue += 1
    this.val += 1

    for (let col = 0; col < NUM_COLUMNS; col++) {
      for (let i = 0; i < NUM_METERS_PER_COLUMN; i++) {
        const x = this.x(col, i)
        const y = this.y(col, i)
        const sin = this.sin8(x - this.val) + 30

        if (y < sin - 30) {
          this.columns[col].meterHSV(i, this.hue + x, 255, 255)
        } else if (y < sin + 30) {
          const brightness = this.map(sin, y - 30, y + 30, 0, 255)
          this.columns[col].meterHSV(i, this.hue + x, 255, brightness)
        } else {
          this.columns[col].meterRGB(i, 0, 0, 0)
        }
      }
    }

    this.show()

    await this.delay(25)
  }
}
