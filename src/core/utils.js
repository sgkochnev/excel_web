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

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
  return true
}

export function isEqual(el1, el2) {
  if (typeof el1 === 'object' && typeof el2 === 'object') {
    return JSON.stringify(el1) === JSON.stringify(el2)
  }
  return el1 === el2
}

export function camelToDashCase(str = '') {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles) {
  return Object.entries(styles)
    .map(([key, val]) => `${camelToDashCase(key)}: ${val}`)
    .join(';')
}

export function debounce(fn, wait) {
  let timeout
  return function (...args) {
    const later = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
