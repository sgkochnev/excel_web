import { defaultStyles } from '../../constants';
import { parse } from '../../core/parse';
import { toInlineStyles } from '../../core/utils';


const CODES = {
  A: 65,
  Z: 90,
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getSize(styleName, state, key) {
  let def = ''
  switch (styleName) {
    case 'width': def = DEFAULT_WIDTH; break
    case 'height': def = DEFAULT_HEIGHT; break
    default:
  }
  const size = state && state[key] ? state[key] : def
  return `${styleName}: ${size}px`
}

function toCell(rowIndex, state) {
  return (_, colIndex) => {
    const colName = toColumnName(_, colIndex)
    const width = getSize('width', state.colState, colName)
    const cell = `${colName}:${rowIndex}`
    const index = `${colIndex + 1}:${rowIndex}`
    const data = state.cellState[index]
    const meta = `
      data-col="${colName}" 
      data-row="${rowIndex}" 
      data-cell="${cell}"
      data-index="${index}"
      data-value="${data || ''}"
    `
    const styles = toInlineStyles({ ...defaultStyles, ...state.stylesState[index] })

    return `<div class="cell" contenteditable="" 
      ${meta}
      style="${width}; ${styles};"
    >${parse(data) || ''}</div>`
  }
}

function toColumn(colState = {}) {
  return colName => {
    const width = getSize('width', colState, colName)
    const meta = `
      data-type="resizable" 
      data-col="${colName}"
    `
    return `
    <div class="column" 
      ${meta}
      style="${width}"
      >
      ${colName}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
  }
}

function toRow(content, index, rowState = {}) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const dataRow = index ? `data-row="${index}"` : ''
  const meta = `
    data-type="resizable" 
    ${dataRow}
  `
  return `
    <div class="row" 
      ${meta}
      style="${getSize('height', rowState, index)}">
      <div class="row-info">
      ${index || ''}
      ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
`
}

export default function createTable(rowsCount = 26, colsCount = 55, state = {}) {
  const { colState, rowState } = state

  const cols = new Array(colsCount)
    .fill('')
    .map(toColumnName)
    .map(toColumn(colState))
    .join('')

  const toTable = (_, i) => {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCell(i, state))
      .join('')

    return i !== 0 ? toRow(cells, i, rowState) : toRow(cols)
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
