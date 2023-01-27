import { TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE } from './types';

function getActionObject(type, data) {
  return { type, data }
}

// Action creator
export function tableResize(data) {
  return getActionObject(TABLE_RESIZE, data)
}

export function changeText(data) {
  return getActionObject(CHANGE_TEXT, data)
}

export function changeStyles(data) {
  return getActionObject(CHANGE_STYLES, data)
}

export function applyStyle(data) {
  return getActionObject(APPLY_STYLE, data)
}

export function changeTitle(data) {
  return getActionObject(CHANGE_TITLE, data)
}
