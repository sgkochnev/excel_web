import ExcelComponent from '../../core/ExcelComponent'
import $ from '../../core/dom'

export default class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    })
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')
    const setText = $cell => this.$formula.text($cell.text())
    this.$on('table:select', setText)
    this.$on('table:input', setText)
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    const text = $(event.target).text()
    this.$emit('formula:input', text)
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
