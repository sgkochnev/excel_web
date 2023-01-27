
import { APPLY_STYLE, CHANGE_TEXT, TABLE_RESIZE, CHANGE_STYLES, CHANGE_TITLE } from './types'

export default function rootReducer(state, action) {
  let currentState
  let field

  let value

  const setState = () => {
    currentState = state[field] || {}
    currentState[action.data.id] = action.data.value
    return { ...state, [field]: currentState }
  }

  // console.log(action);
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return { ...setState() }
    case CHANGE_TEXT:
      field = 'cellState'
      return { ...setState(), currentText: action.data.value }
    case CHANGE_STYLES:
      field = 'currentStyles'
      return { ...state, [field]: action.data }
    case APPLY_STYLE:
      field = 'stylesState'
      value = state[field] || {}
      action.data.ids.forEach(id => { value[id] = { ...value[id], ...action.data.value } })
      return { ...state, [field]: value, currentStyles: { ...state.currentStyles, ...action.data.value } }
    case CHANGE_TITLE:
      field = 'title'
      return { ...state, [field]: action.data.value }
    default: return state
  }
}
