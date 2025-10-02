import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { JobStatus, Job } from '../types'
import { JobCard } from './JobCard'
import { useNavigation } from '../navigation/NavigationProvider'

interface ColumnProps {
  status: JobStatus
  jobs: Job[]
  showOutcomeSummary?: boolean
}

export const Column = ({ status, jobs, showOutcomeSummary = true }: ColumnProps) => {
  const { navigate } = useNavigation()
  const { isOver, setNodeRef } = useDroppable({
    id: `column-${status.id}`,
    data: {
      type: 'column',
      statusId: status.id,
    },
  })

  const isOutcomeColumn =
    showOutcomeSummary && (status.slug === 'accepted' || status.slug === 'rejected')

  if (isOutcomeColumn) {
    const outcomeVariant = status.slug === 'accepted' ? 'accepted' : 'rejected'

    return (
      <div
        ref={setNodeRef}
        className={`kanban__column kanban__column--outcome${isOver ? ' kanban__column--over' : ''}`}
        role="listitem"
        aria-label={`${status.name} column`}
      >
        <header className="kanban__column-header">
          <h3>{status.name}</h3>
          <span className="kanban__column-count">{jobs.length}</span>
        </header>

        <button
          type="button"
          className={`outcome-summary outcome-summary--${outcomeVariant}`}
          onClick={() => navigate(`/status/${status.slug}`)}
        >
          <span className="outcome-summary__count" aria-live="polite">
            {jobs.length}
          </span>
          <span className="outcome-summary__label">View details</span>
        </button>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      className={`kanban__column${isOver ? ' kanban__column--over' : ''}`}
      role="listitem"
      aria-label={`${status.name} column`}
    >
      <header className="kanban__column-header">
        <h3>{status.name}</h3>
        <span className="kanban__column-count">{jobs.length}</span>
      </header>

      <SortableContext
        id={`column-sortable-${status.id}`}
        items={jobs.map((job) => job.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div className="kanban__column-list">
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="kanban__empty-column">No jobs in this stage yet.</p>
          )}
        </div>
      </SortableContext>
    </div>
  )
}
