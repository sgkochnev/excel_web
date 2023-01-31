export default class Page {
  constructor(params) {
    this.params = params
  }

  getRoot() {
    throw new Error('Method gerRoot should be implemented')
  }

  afterRender() {}

  destroy() {}
}
