import type { ReactNode } from 'react'
import { KanbanBoard } from '../../components/KanbanBoard'

type ApplicationsBoardAction = {
  label: string
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
  onClick?: () => void
}

export type ApplicationsBoardProps = {
  eyebrow?: string
  title: string
  description?: string
  actions?: ApplicationsBoardAction[]
  board?: ReactNode
}

export const ApplicationsBoard = ({
  eyebrow,
  title,
  description,
  actions = [],
  board = <KanbanBoard />,
}: ApplicationsBoardProps) => {
  return (
    <section className="applications-board" aria-labelledby="applications-board-heading">
      <header className="applications-board__header">
        <div>
          {eyebrow ? <p className="applications-board__eyebrow">{eyebrow}</p> : null}
          <h2 id="applications-board-heading">{title}</h2>
          {description ? <p className="applications-board__description">{description}</p> : null}
        </div>

        {actions.length > 0 ? (
          <div className="applications-board__actions">
            {actions.map(({ label, variant = 'secondary', icon, onClick }) => (
              <button
                key={label}
                type="button"
                className={`applications-board__button${
                  variant === 'primary' ? ' applications-board__button--primary' : ''
                }`}
                onClick={onClick}
              >
                {icon ? (
                  <span aria-hidden="true" className="applications-board__button-icon">
                    {icon}
                  </span>
                ) : null}
                <span className="applications-board__button-label">{label}</span>
              </button>
            ))}
          </div>
        ) : null}
      </header>

      <div className="applications-board__body">{board}</div>
    </section>
  )
}
