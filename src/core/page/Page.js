export default class Page {
  constructor(params) {
    this.params = params || Date.now().toString()
  }

  getRoot() {
    throw new Error('Method gerRoot should be implemented')
  }

  afterRender() {}

  destroy() {}
}
