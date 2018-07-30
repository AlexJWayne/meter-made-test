// @flow

export default function mapTimes<T>(times: number, fn: number => T): T[] {
  const emptyArray = [...Array(times)]
  return emptyArray.map((_, i) => fn(i))
}
