import { defaultStyles } from '../../constants';
import ExcelStateComponent from '../../core/ExcelStateComponent';
import $ from '../../core/dom'
import createToolbar from './toolbar.template';

export default class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'


  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    const $button = $target.closest('[data-type="button"]')
    if (!$button.isNull()) {
      const value = JSON.parse($button.data.value)
      this.$emit('toolbar:applyStyle', value)

      // const [[key, val]] = Object.entries(value)
      // this.setState({ [key]: val })
    }
  }
}
