import { defaultTitle } from '../../constants'
import ExcelComponent from '../../core/ExcelComponent'
import $ from '../../core/dom'
import ActiveRoute from '../../core/routes/ActiveRoute'
import { changeTitle } from '../../redux/actions'

export default class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    },
    )
  }

  toHTML() {
    const { title } = this.store.getState() || defaultTitle
    return `
      <input class="input" type="text" value="${title}" placeholder="Новая таблица">
      <div>
        <button class="button" data-button="remove">
           <span class="material-symbols-outlined">delete</span>
        </button>
        <button class="button" data-button="exit">
           <span class="material-symbols-outlined">exit_to_app</span>
        </button>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle({ value: $target.text() }))
  }

  onClick(event) {
    const $target = $(event.target)
    const button = $target.closest('[data-button]')
    if (!button.isNull()) {
      if (button.data.button === 'exit') {
        ActiveRoute.navigate('')
      }
      if (button.data.button === 'remove') {
        const decision = confirm('Вы действительно хотите удалить таблицу?')
        if (decision) {
          localStorage.removeItem(`excel:${ActiveRoute.param}`)
          ActiveRoute.navigate('')
        }
      }
    }
  }
}
