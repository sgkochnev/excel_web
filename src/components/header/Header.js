import ExcelComponent from '../../core/ExcelComponent'

export default class Header extends ExcelComponent {
  static className = 'excel__header'
  toHTML() {
    return `
      <input class="input" type="text" value="Новая таблица">
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
}
