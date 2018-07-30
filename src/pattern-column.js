// @flow

import mapTimes from './map-times'
import hsv from './hsv'
import { NUM_LEDS_PER_METER, NUM_METERS_PER_COLUMN, NUM_LEDS_PER_COLUMN } from './pattern-base'

export default class Column {
  leds: [number, number, number][]

  constructor() {
    this.leds = mapTimes(NUM_LEDS_PER_COLUMN, () => [0, 0, 0])
  }

  ledRGB(ledIndex: number, r: number, g: number, b: number) {
    this.leds[ledIndex] = [r % 256, g % 256, b % 256]
  }

  ledHSV(ledIndex: number, h: number, s: number, v: number) {
    this.ledRGB(ledIndex, ...hsv(h, s, v))
  }

  meterRGB(meterIndex: number, r: number, g: number, b: number, mask: number = 0b1111) {
    for (let i = 0; i < NUM_LEDS_PER_METER; i++) {
      const ledIndex = meterIndex * NUM_LEDS_PER_METER + i
      if (mask & (1 << i)) {
        this.ledRGB(ledIndex, r, g, b)
      }
    }
  }

  meterHSV(meterIndex: number, h: number, s: number, v: number, mask: number = 0b1111) {
    this.meterRGB(meterIndex, ...hsv(h, s, v), mask)
  }

  doubleMeterRGB(r: number, g: number, b: number, mask: number = 0b1111) {
    this.meterRGB(0, r, g, b, mask)
    this.meterRGB(1, r, g, b, mask)
  }

  doubleMeterHSV(h: number, s: number, v: number, mask: number = 0b1111) {
    this.doubleMeterRGB(...hsv(h, s, v), mask)
  }
}
