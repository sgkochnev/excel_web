// export default function createStore(rootReducer, initialState = {}) {
//   let state = rootReducer({ ...initialState }, { type: '__INIT__' })
//   let listeners = []
//   return {
//     subscribe(fn) {
//       listeners.push(fn)
//       return {
//         unsubscribe() { listeners = listeners.filter(l => l !== fn) },
//       }
//     },
//     dispatch(action) {
//       state = rootReducer(state, action)
//       listeners.forEach(l => l(state))
//     },
//     getState() {
//       return state
//     },
//   }
// }

export default class Store {
  #state = {}
  #listeners = []
  #rootReduser

  constructor(rootReduser, initialState = {}) {
    this.#rootReduser = rootReduser
    this.#state = this.#rootReduser({ ...initialState }, { type: '__INIT__' })
  }

  subscribe(fn) {
    this.#listeners.push(fn)
    return {
      unsubscribe() { this.#listeners = this.#listeners.filter(l => l !== fn) },
    }
  }

  dispatch(action) {
    this.#state = this.#rootReduser(this.#state, action)
    this.#listeners.forEach(l => l(this.#state))
  }

  getState() {
    return JSON.parse(JSON.stringify(this.#state))
  }
}
