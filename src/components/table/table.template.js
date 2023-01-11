const CODES = {
  A: 65,
  Z: 90,
}


function toCell() {
  return `
    <div class="cell" contenteditable=""></div>
  `
}

function toColumn(colName) {
  return `
    <div class="column">${colName}</div>
  `
}

function toRow(content, index) {
  return `
    <div class="row">
      <div class="row-info">${index || ''}</div>
      <div class="row-data">${content}</div>
    </div>
`
}

export default function createTable(rowsCount = 26, colsCount = 55) {
  const cols = new Array(colsCount)
    .fill('')
    .map(toColumnName)
    .map(toColumn)
    .join('')

  const cells = new Array(colsCount)
    .fill('')
    .map(toCell)
    .join('')

  const toTable = (_, i) => (
    i !== 0 ? toRow(cells, i) : toRow(cols, null)
  )

  return new Array(rowsCount + 1)
    .fill('')
    .map(toTable)
    .join('')
}

function toColumnName(_, idx = 0) {
  let colName = ''
  const countUnicueSymbols = (CODES.Z - CODES.A) + 1

  while (idx >= countUnicueSymbols) {
    colName = getChar(idx % countUnicueSymbols) + colName

    const i = Math.floor(idx / countUnicueSymbols)
    idx = idx < countUnicueSymbols ? i : i - 1
  }

  return getChar(idx) + colName
}

function getChar(idx) {
  return String.fromCharCode(CODES.A + (idx))
}
