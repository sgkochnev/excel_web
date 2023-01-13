const CODES = {
  A: 65,
  Z: 90,
}


function toCell(colIndex = '', rowIndex = 0) {
  return `
    <div class="cell" contenteditable="" data-col="${colIndex}" data-row="${rowIndex}"></div>
  `
}

function toColumn(colName) {
  return `
    <div class="column" data-type="resizable" data-col="${colName}">
      ${colName}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toRow(content, index) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''

  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
      ${index || ''}
      ${resize}
      </div>
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

  const toTable = (_, i) => {
    const cells = new Array(colsCount)
      .fill('')
      .map(toColumnName)
      // .map((el) => el + i)
      .map(toCell)
      .join('')

    return i !== 0 ? toRow(cells, i) : toRow(cols, null)
  }

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
