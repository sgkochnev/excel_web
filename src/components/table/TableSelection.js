import { range } from '../../core/utils'

export default class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  clear() {
    this.group
      .forEach(
        el => el.classList.remove(TableSelection.className),
      )
    this.group = []
  }

  select($el) {
    if (this.group.length > 0) {
      this.clear()
    }
    this.current = $el
    this.group.push($el)
    $el.focus().classList.add(TableSelection.className)
  }

  selectGroup($el, $root) {
    if (this.group.length > 0) {
      this.clear()
    }

    const firstCell = this.current.id(true)
    const currentCell = $el.id(true)

    this.group.push(
      ...getArrayCellIDs(firstCell, currentCell)
        .map(el => $root.find(`[data-index="${el}"]`)),
    )
    this.group.forEach(el => el.classList.add(TableSelection.className))
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }

  get selectedIDs() {
    return this.group.map($el => $el.id())
  }
}

function getArrayCellIDs(start = {}, end = {}) {
  const rows = range(start.col, end.col)
  const cols = range(start.row, end.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}
