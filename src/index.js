import Router from './core/routes/Router'
import DashboardPage from './pages/DashboardPage'
import ExcelPage from './pages/ExcelPage'
import './css/main.css'

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
})
