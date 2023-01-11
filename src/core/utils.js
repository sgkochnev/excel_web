export default function toTitle(str = '') {
  if (typeof str !== 'string') {
    return str
  }
  if (str.trim() !== '') {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  return str
}
