import './App.css'
import { HeroHeader } from './components/dashboard/HeroHeader'
import { ApplicationsBoard } from './components/dashboard/ApplicationsBoard'

export default function App() {
  return (
    <div className="app-shell">
      <HeroHeader />

      <main className="dashboard-grid">
        <div className="dashboard-grid__column dashboard-grid__column--center">
          <ApplicationsBoard />
        </div>
      </main>
    </div>
  )
}

