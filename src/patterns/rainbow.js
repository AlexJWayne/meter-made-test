import Base, {
  NUM_COLUMNS,
  NUM_DISTANCE_SENSORS,
  NUM_LEDS_PER_METER,
  NUM_METERS_PER_COLUMN,
  NUM_LEDS_PER_COLUMN,
} from '../pattern-base'

export default class Rainbow extends Base {
  constructor(...args) {
    super(...args)
  }

  start() {
    this.hue = 0
  }

  async loop() {
    // Advance hue for this next frame.
    this.hue -= 2

    for (let col = 0; col < NUM_COLUMNS; col++) {
      // Make the colors whiter if the sensor is triggered.
      const sat = this.sensors[col] ? 64 : 255

      for (let i = 0; i < NUM_METERS_PER_COLUMN; i++) {
        const hue = this.hue + this.x(col, i) + this.y(col, i)
        this.columns[col].meterHSV(i, hue, sat, 255)
      }
    }

    this.show()

    await this.delay(25)
  }
}
