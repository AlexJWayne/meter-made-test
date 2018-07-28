import Base, {
  NUM_COLUMNS,
  NUM_DISTANCE_SENSORS,
  NUM_LEDS_PER_METER,
  NUM_METERS_PER_COLUMN,
  NUM_LEDS_PER_COLUMN,
  delay,
} from './base'

export default class Rainbow extends Base {
  start() {
    super.start()
    this.hue = 0
  }

  async loop() {
    // Advance hue for this next frame.
    this.hue -= 2

    for (let col = 0; col < NUM_COLUMNS; col++) {
      // Shift the hife column to column
      const colHue = (255 * col) / NUM_COLUMNS

      // Make the colors whiter if the sensor is triggered.
      const sat = this.sensors[col] ? 64 : 255

      for (let i = 0; i < NUM_METERS_PER_COLUMN - 1; i++) {
        // Shift the hife meter to meter
        const meterHue = (255 * i) / (NUM_METERS_PER_COLUMN - 1)

        // Get final hue.
        const hue = this.hue + colHue + meterHue

        // Match the double meter leds.
        if (i == 0) {
          this.columns[col].SetMeterToHSV(i, hue, sat, 255)
        }

        // Set all other meters.
        this.columns[col].SetMeterToHSV(i + 1, hue, sat, 255)
      }
    }

    this.showAllColumns()

    await delay(25)
  }
}