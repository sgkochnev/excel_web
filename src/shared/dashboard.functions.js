import { storage } from '../core/utils';

function toHTML(key) {
  const store = storage(key)
  const [, id] = key.split(':')

  const date = new Date(store.openedDate).toLocaleDateString()
  const time = new Date(store.openedDate).toLocaleTimeString()
  return `
    <li class="dashboard__record">
        <a href="#excel/${id}">${store.title}</a>
        <strong>${date} / ${time}</strong>
    </li>
    `
}

export function createRecordsTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return 'Таблиц нет!'
  }

  return `
  <div class="dashboard__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
  </div>

  <ul class="dashboard__list">
      ${keys.map(toHTML).join('')}
  </ul>
`
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.includes('excel')) {
      keys.push(key)
    }
  }
  return keys
}
