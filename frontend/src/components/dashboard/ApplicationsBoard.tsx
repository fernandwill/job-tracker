import { FunnelIcon, PlusIcon } from './icons'
import { KanbanBoard } from '../../components/KanbanBoard'

export const ApplicationsBoard = () => {
  return (
    <section className="applications-board" aria-labelledby="applications-board-heading">
      <header className="applications-board__header">
        <div>
          <p className="applications-board__eyebrow">Pipeline overview</p>
          <h2 id="applications-board-heading">Applications board</h2>
          <p className="applications-board__description">
            Drag cards between stages to keep each opportunity up to date. Everything stays in sync across
            your team.
          </p>
        </div>

        <div className="applications-board__actions">
          <button type="button" className="applications-board__button applications-board__button--primary">
            <PlusIcon aria-hidden="true" />
            New application
          </button>
          <button type="button" className="applications-board__button">
            <FunnelIcon aria-hidden="true" />
            Filter
          </button>
        </div>
      </header>

      <div className="applications-board__body">
        <KanbanBoard />
      </div>
    </section>
  )
}
