import Table from './Table'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.cell
}

export function nextSelector(key, { col, row }) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      if (row < Table.rowsCount) row++
      break

    case 'Tab':
    case 'ArrowRight':
      if (col < Table.colsCount) col++
      break

    case 'ArrowLeft':
      if (col > 1) col--
      break

    case 'ArrowUp':
      if (row > 1) row--
      break

    default:
  }
  return `[data-index="${col}:${row}"`
}
