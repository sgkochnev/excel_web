import { defaultTitle } from '../../constants'
import ExcelComponent from '../../core/ExcelComponent'
import $ from '../../core/dom'
import { changeTitle } from '../../redux/actions'

export default class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    },
    )
  }

  toHTML() {
    const { title } = this.store.getState() || defaultTitle
    return `
      <input class="input" type="text" value="${title}" placeholder="Новая таблица">
      <div>
        <button class="button">
           <span class="material-symbols-outlined">delete</span>
        </button>
        <button class="button">
           <span class="material-symbols-outlined">exit_to_app</span>
        </button>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle({ value: $target.text() }))
  }
}
