import ExcelComponent from '../../core/ExcelComponent'
import $ from '../../core/dom'
import { parse } from '../../core/parse'
import { tableResize, changeText, changeStyles, applyStyle } from '../../redux/actions'
import { defaultStyles } from '../../constants'
import createTable from './table.template'
import resize from './table.resize'
import TableSelection from './TableSelection'
import { isCell, shouldResize, nextSelector } from './table.helpers'

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

  init() {
    super.init()

    const $cell = this.$root.find('[data-cell="A:1"]')
    this.selectCell($cell)
    this.$on('formula:input',
      text => {
        this.selection.current
          .attr('data-value', text)
          .text(parse(text))
        this.updateTextInStore(text)
      },
    )
    this.$on('formula:done',
      () => this.selection.current.focus(),
    )

    this.$on('toolbar:applyStyle', style => {
      this.selection.applyStyle(style)
      this.$dispatch(applyStyle({
        value: style,
        ids: this.selection.selectedIDs,
      }))
    })
  }

  toHTML() {
    return createTable(
      Table.rowsCount, Table.colsCount,
      this.store.getState(),
    )
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(changeStyles(styles))
  }

  updateTextInStore(value) {
    this.$dispatch(changeText({
      id: this.selection.current.id(),
      value,
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }

  async resizeTable(event) {
    try {
      const data = await resize(event, this.$root)
      this.$dispatch(tableResize(data))
    } catch (error) {
      console.error('Resize error: ', error.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $cell = $(event.target)

      if (event.shiftKey) {
        this.selection.selectGroup($cell, this.$root)
        return
      }
      this.selectCell($cell)
      // this.selection.select($cell)
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
