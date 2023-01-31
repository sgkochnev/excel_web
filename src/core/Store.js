export default class Store {
  listeners = []

  constructor(rootReduser, initialState = {}) {
    this.rootReduser = rootReduser
    this.state = this.rootReduser({ ...initialState }, { type: '__INIT__' })
  }

  subscribe(fn) {
    this.listeners.push(fn)

    const unsubscribe = () => (this.listeners = this.listeners.filter(l => l !== fn))

    return { unsubscribe }
  }

  dispatch(action) {
    this.state = this.rootReduser(this.state, action)
    this.listeners.forEach(l => l(this.state))
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state))
  }
}
