
import $ from '../core/dom';
import Page from '../core/page/Page';
import { createRecordsTable } from '../shared/dashboard.functions';

export default class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return $.create('div', 'dashboard').html(`
    <div class="dashboard__header">
        <h1>Панель управления</h1>
    </div>

    <div class="dashboard__new">
        <div class="dashboard__view">
            <a href="#excel/${now}" class="dashboard__create">
                Новая <br> таблица
            </a>
        </div>
    </div>

    <div class="dashboard__table dashboard__view">
        ${createRecordsTable()}
    </div>
    `)
  }
}
