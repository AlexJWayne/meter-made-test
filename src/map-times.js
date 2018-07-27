export default function mapTimes(times, fn) {
  const emptyArray = [...Array(times)]
  return emptyArray.map((_, i) => fn(i))
}
