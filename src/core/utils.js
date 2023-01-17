export function toTitle(str = '') {
  if (typeof str !== 'string') {
    return str
  }
  if (str.trim() !== '') {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  return str
}

export function range(start = 0, end = 0) {
  if (start > end) [start, end] = [end, start]
  return new Array((end - start) + 1)
    .fill('')
    .map((_, i) => start + i)
}
