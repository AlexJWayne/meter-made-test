import Base, {
  NUM_COLUMNS,
  NUM_DISTANCE_SENSORS,
  NUM_LEDS_PER_METER,
  NUM_METERS_PER_COLUMN,
  NUM_LEDS_PER_COLUMN,
  delay,
} from './base'

export default class Cylon extends Base {
  start() {
    super.start()
    this.state = 0
  }

  async loop() {
    this.state++
    if (this.state > 5) this.state = 0

    let mask
    switch (this.state) {
      case 0:
        mask = '0100'
        break
      case 1:
        mask = '0010'
        break
      case 2:
        mask = '0001'
        break
      case 3:
        mask = '0010'
        break
      case 4:
        mask = '0100'
        break
      case 5:
        mask = '1000'
        break
      default:
        break
    }

    for (let col = 0; col < NUM_COLUMNS; col++) {
      for (let i = 0; i < NUM_METERS_PER_COLUMN; i++) {
        this.columns[col].SetMeterToRGB(i, 0, 0, 0)
        this.columns[col].SetMeterToRGB(i, 255, 0, 0, mask)
      }
    }

    this.showAllColumns()

    await delay(200)
  }
}
