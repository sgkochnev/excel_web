import DOMListener from './DOMListener'

export default class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.subscribe = options.subscribe || []
    this.unsubscribers = []

    this.prepare()
  }

  prepare() {}

  // toHTML returns the component template
  toHTML() {
    return ''
  }

  // $emit notifies listeners of the event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // $on subscribe to the event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }
}
