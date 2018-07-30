import mapTimes from './map-times'
import hsv from './hsv'
import PatternColumn from './pattern-column'

export const NUM_COLUMNS = 10
export const NUM_LEDS_PER_METER = 4
export const NUM_METERS_PER_COLUMN = 9
export const NUM_LEDS_PER_COLUMN = NUM_LEDS_PER_METER * NUM_METERS_PER_COLUMN

export default class Pattern {
  constructor({ showAllColumns, showColumn }) {
    this.showColumn = showColumn
    this.running = false

    this.show = () => {
      showAllColumns(this.columns)
    }

    this.columns = mapTimes(NUM_COLUMNS, i => new PatternColumn())
    this.sensors = mapTimes(NUM_COLUMNS, () => false)
  }

  setSensors(sensors) {
    this.sensors = sensors
  }

  begin() {
    this.running = true
    this.start()
    setTimeout(async () => {
      while (this.running) {
        await this.loop()
        await this.delay(1)
      }
    }, 10)
  }

  // Optionally, override.
  start() {}

  stop() {
    this.running = false
  }

  // Override
  async loop() {
    // Do nothing...
    this.showAllColumns()
    await this.delay(100)
  }

  // Utility functions for use in patterns
  // -------------------------------------

  // Pause execution. Call with `await`.
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  sin8(x) {
    x %= 256
    if (x < 0) x + 256

    const sin = Math.sin((x / 256) * 2 * Math.PI)
    return Math.round(((sin + 1) / 2) * 255)
  }

  cos8(x) {
    x %= 256
    if (x < 0) x + 256

    const sin = Math.cos((x / 256) * 2 * Math.PI)
    return Math.round(((sin + 1) / 2) * 255)
  }
}
