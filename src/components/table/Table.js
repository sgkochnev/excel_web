import ExcelComponent from '../../core/ExcelComponent'
import shouldResize from './table.helpers'
import createTable from './table.template'
import resize from './table.resize'

export default class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  toHTML() {
    return createTable(100, 26)
  }

  onClick() {
    console.log('click');
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resize(event, this.$root)
    }
  }
}
