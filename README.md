# Pattern API

## Constants

```js
NUM_COLUMNS = 10
NUM_LEDS_PER_METER = 4
NUM_METERS_PER_COLUMN = 9
NUM_LEDS_PER_COLUMN = 36
```

## Use the base class

Create and export a class that inherits from the patterns base. And while you're at it, import whatever constants you need.

```js
import Base, {
  NUM_COLUMNS,
  NUM_DISTANCE_SENSORS,
  NUM_LEDS_PER_METER,
  NUM_METERS_PER_COLUMN,
  NUM_LEDS_PER_COLUMN,
} from './base'

export default class Rainbow extends Base {
  start() {
    this.whateverIsNeeded = '<3'
  }

  async loop() {
    // Set all meters to red.
    for (let col = 0; col < NUM_COLUMNS; col++) {
      for (let meter = 0; meter < NUM_METERS_PER_COLUMN - 1; meter++) {
        this.columns[col].SetMeterToHSV(meter, 0, 255, 255)
      }
    }

    // Delay until next frame.
    await this.delay(25)
  }
}
```

## Publishing the pattern

Put your pattern in `src/patterns` and export it from `src/patterns/index.js` and it should then show up in the UI.

## Methods to override

- `start()` Use this method to setup any instance variables required when the patterns begins to run. It is called exactly once when the patterns is switched to.
- `async loop()` Use this method to animate your pattern. Set led colors of all columns and then call `this.showAllColumns`.

## Pattern API

- `this.showAllColumns()` Display all the work you just did.
- `await this.delay()` Equivalent to Arduino's delay function. Call it at the end of your pattern with a value that makes sense. _Make sure you use `await`!_
- `this.columns` An array of column objects that you will call methods on to change led colors.
- `this.sensors` An array of booleans, one per column. The value for that column will be `true` if the proximity sensor is triggered.
- `this.sin8(byte)` 8 bit sine function. Returns 0-255.
- `this.cos8(byte)` 8 bit cosine function. Returns 0-255.

## Column API

- `this.ledRGB(i, r, g, b)` Set the led an index `i` in this column to an rgb color.
- `this.ledHSV(i, h, s, v)` Set the led an index `i` in this column to an hsv color.
- `this.meterRGB(meterIndex, r, g, b, mask = 0b1111)` Set some/all leds in the meter at `meterIndex` to an rgb color.
- `this.meterHSV(meterIndex, h, s, v, mask = 0b1111)` Set some/all leds in the meter at `meterIndex` to an hsv color.
- `this.doubleMeterRGB(meterIndex, r, g, b)` Set all leds in the double meters to an rgb color.
- `this.doubleMeterHSV(meterIndex, h, s, v)` Set all leds in the double meters to an hsv color.

`mask` in the above methods is a 4 character binary value expressed in binary notation `0b1111` where each bit is `0` or `1`. Only leds in the meter with a `1` in the mask will be set.
