import ExcelComponent from '../../core/ExcelComponent'
import $ from '../../core/dom'
import createTable from './table.template'
import resize from './table.resize'
import { isCell, shouldResize, nextSelector } from './table.helpers'
import TableSelection from './TableSelection'

export default class Table extends ExcelComponent {
  static className = 'excel__table'
  static colsCount = 26
  static rowsCount = 100

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  toHTML() {
    return createTable(Table.rowsCount, Table.colsCount)
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-cell="A:1"]')
    this.selectCell($cell)
    this.$on('formula:input',
      text => this.selection.current.text(text),
    )
    this.$on('formula:done',
      () => this.selection.current.focus(),
    )
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resize(event, this.$root)
    } else if (isCell(event)) {
      const $cell = $(event.target)

      if (event.shiftKey) {
        this.selection.selectGroup($cell, this.$root)
        return
      }
      this.selectCell($cell)
      this.selection.select($cell)
    }
  }

  onKeydown(event) {
    const keys = [
      'Tab', 'ArrowUp', 'ArrowLeft',
      'Enter', 'ArrowDown', 'ArrowRight',
    ]
    const { key } = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selection.select($next)
      this.selectCell($next)
    }
  }
}
