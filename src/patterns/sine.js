import Base, {
  NUM_COLUMNS,
  NUM_DISTANCE_SENSORS,
  NUM_LEDS_PER_METER,
  NUM_METERS_PER_COLUMN,
  NUM_LEDS_PER_COLUMN,
} from '../pattern-base'

import mapTimes from '../map-times'
export default class Sine extends Base {
  start() {
    this.val = 0
  }

  async loop() {
    this.val -= 1

    for (let col = 0; col < NUM_COLUMNS; col++) {
      for (let i = 0; i < NUM_METERS_PER_COLUMN; i++) {
        const x = (col * 255) / NUM_COLUMNS

        const yLo = ((i - 1) * 255) / (NUM_METERS_PER_COLUMN - 1)
        const yHi = (i * 255) / (NUM_METERS_PER_COLUMN - 1)

        const val = this.sin8(this.val + x)

        if (val <= yLo) {
          this.columns[col].meterRGB(i, 255, 0, 0)
        } else if (val < yHi) {
          const bright = (1 - (val - yLo) / (yHi - yLo)) * 255
          this.columns[col].meterHSV(i, 0, 255, bright)
        } else {
          this.columns[col].meterRGB(i, 0, 0, 0)
        }
      }
    }

    this.show()

    await this.delay(25)
  }
}
