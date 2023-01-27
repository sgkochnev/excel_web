import { defaultStyles, defaultTitle } from '../constants'
import { storage } from '../core/utils'

const defaultState = {
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

export const initialState = storage('excel-state') ? normalize(storage('excel-state')) : defaultState
