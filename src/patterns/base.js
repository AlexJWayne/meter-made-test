import mapTimes from '../map-times'
import hsv from '../hsv'

export const NUM_COLUMNS = 10
export const NUM_DISTANCE_SENSORS = 10
export const NUM_LEDS_PER_METER = 4
export const NUM_METERS_PER_COLUMN = 9
export const NUM_LEDS_PER_COLUMN = NUM_LEDS_PER_METER * NUM_METERS_PER_COLUMN

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default class Pattern {
  constructor({ showAllColumns, showColumn }) {
    this.showColumn = showColumn

    this.showAllColumns = () => {
      showAllColumns(this.columns)
    }

    this.columns = mapTimes(
      NUM_COLUMNS,
      i =>
        new Column({
          showColumn: () => console.log('showColumn'),
          showAllColumns: () => console.log('showAllColumns'),
        }),
    )
  }

  start() {
    setTimeout(async () => {
      while (true) {
        await this.loop()
        await delay(1)
      }
    }, 10)
  }

  async loop() {
    // Do nothing...
    this.showAllColumns()
    await delay(1000)
  }
}

class Column {
  constructor() {
    this.leds = mapTimes(NUM_LEDS_PER_COLUMN, () => [0, 0, 0])
  }

  SetLEDToRGB(i, r, g, b) {
    this.leds[i] = [r % 256, g % 256, b % 256]
  }

  SetLEDToHSV(i, h, s, v) {
    this.SetLEDToRGB(i, ...hsv(h, s, v))
  }

  SetMeterToRGB(meterIndex, r, g, b, mask = '1111') {
    for (let i = 0; i < NUM_LEDS_PER_METER; i++) {
      const ledIndex = meterIndex * NUM_LEDS_PER_METER + i
      if (mask[i] === '1') {
        this.SetLEDToRGB(ledIndex, r, g, b)
      }
    }
  }

  SetMeterToHSV(i, h, s, v, mask) {
    this.SetMeterToRGB(i, ...hsv(h, s, v), mask)
  }
}
