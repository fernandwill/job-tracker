import './App.css'

export default function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <span className="sidebar__brand-badge">JT</span>
          <div>
            <h1>Job Tracker</h1>
            <p>Stay on top of every opportunity.</p>
          </div>
        </div>

        <nav className="sidebar__nav" aria-label="Primary navigation">
          <a className="sidebar__link sidebar__link--active" href="#">Kanban board</a>
          <a className="sidebar__link" href="#">Calendar</a>
          <a className="sidebar__link" href="#">Reports</a>
          <a className="sidebar__link" href="#">Settings</a>
        </nav>

        <div className="sidebar__footer">
          <button className="sidebar__new-board" type="button">
            + New board
          </button>
          <p className="sidebar__hint">Organize positions by team or workflow.</p>
        </div>
      </aside>

      <div className="workspace">
        <header className="workspace__header">
          <div>
            <h2>Applications pipeline</h2>
            <p>Monitor each application as it moves from prospect to offer.</p>
          </div>

          <div className="workspace__actions">
            <button className="workspace__action workspace__action--primary" type="button">
              Add application
            </button>
            <button className="workspace__action" type="button">
              Filter
            </button>
          </div>
        </header>

        <section className="kanban" aria-label="Kanban board">
          <div className="kanban__placeholder">
            Drag-and-drop columns and cards will appear here once configured.
          </div>
        </section>
      </div>
    </div>
  )
}

