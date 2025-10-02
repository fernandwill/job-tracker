import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { JobStatus, Job } from '../types'
import { JobCard } from './JobCard'

interface ColumnProps {
  status: JobStatus
  jobs: Job[]
}

export const Column = ({ status, jobs }: ColumnProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `column-${status.id}`,
    data: {
      type: 'column',
      statusId: status.id,
    },
  })

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
