import ExcelComponent from '../../core/ExcelComponent'

export default class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    })
  }

  toHTML() {
    return `
      <button class="button">
        <span class="material-symbols-outlined">format_align_left</span>
      </button>
      <button class="button">
        <span class="material-symbols-outlined">format_align_center</span>
      </button>
      <button class="button">
        <span class="material-symbols-outlined">format_align_right</span>
      </button>
      <button class="button">
        <span class="material-symbols-outlined">format_bold</span>
      </button>
      <button class="button">
        <span class="material-symbols-outlined">format_italic</span>
      </button>
      <button class="button">
        <span class="material-symbols-outlined">format_underlined</span>
      </button>
    `
  }

  onClick(event) {
    console.log(this.$root);
    console.log('Toolbar: onClick', event.target.textContent.trim())
  }
}
