import './App.css'
import { HeroHeader } from './components/dashboard/HeroHeader'
import { ApplicationsBoard } from './components/dashboard/ApplicationsBoard'
import { StatusDetailPage } from './pages/StatusDetailPage'
import { useNavigation } from './navigation/NavigationProvider'

export default function App() {
  const { pathname } = useNavigation()
  const isStatusView = pathname.startsWith('/status/')
  const statusSlug = isStatusView ? decodeURIComponent(pathname.replace('/status/', '').replace(/^\/+/, '')) : null

  return (
    <div className="app-shell">
      <HeroHeader />

      <main className="dashboard-grid">
        <div className="dashboard-grid__column dashboard-grid__column--center">
          {isStatusView && statusSlug ? <StatusDetailPage slug={statusSlug} /> : <ApplicationsBoard />}
        </div>
      </main>
    </div>
  )
}

