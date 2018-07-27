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
    this.hue -= 2

    for (let col = 0; col < NUM_COLUMNS; col++) {
      const colHue = (255 * col) / NUM_COLUMNS

      for (let i = 0; i < NUM_METERS_PER_COLUMN - 1; i++) {
        const meterHue = (255 * i) / (NUM_METERS_PER_COLUMN - 1)
        const hue = this.hue + colHue + meterHue

        // Match the double meter leds.
        if (i == 0) {
          this.columns[col].SetMeterToHSV(i, hue, 255, 255)
        }
        this.columns[col].SetMeterToHSV(i + 1, hue, 255, 255)
      }
    }

    this.showAllColumns()

    await delay(25)
  }
}
