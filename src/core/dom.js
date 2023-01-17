class DOM {
  constructor(selector) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof DOM) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  get classList() {
    return this.$el.classList
  }

  get style() {
    return this.$el.style
  }

  css(styles = {}) {
    Object.entries(styles)
      .forEach(([k, v]) => {
        this.$el.style[k] = v;
      })
    return this
  }

  findAll(selector) {
    return $(this.$el.querySelectorAll(selector))
  }

  focus() {
    this.$el.focus()
    return this
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  forEach(callback) {
    return this.$el.forEach(callback)
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        col: +parsed[0],
        row: +parsed[1],
      }
    }
    return this.data.index
  }
}

export default function $(selector) {
  return new DOM(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
