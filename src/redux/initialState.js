import { defaultStyles, defaultTitle } from '../constants'
import { clone } from '../core/utils'

const defaultState = {
  openedDate: new Date().toJSON(),
  rowState: {},
  colState: {},
  cellState: {},
  stylesState: {},
  currentText: '',
  title: defaultTitle,
  currentStyles: defaultStyles,
}

const normalize = state => {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  }
}

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
