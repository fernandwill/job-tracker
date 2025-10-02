import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import type { CSSProperties } from 'react'
import type { Job } from '../types'

interface JobCardProps {
  job: Job
}

export const JobCard = ({ job }: JobCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: job.id.toString(),
    data: {
      type: 'job',
      jobId: job.id,
      statusId: job.job_status_id,
    },
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`kanban__card${isDragging ? ' kanban__card--dragging' : ''}`}
      aria-label={`${job.title} at ${job.company}`}
      {...attributes}
      {...listeners}
    >
      <header className="kanban__card-header">
        <h4 className="kanban__card-title">{job.title}</h4>
        <p className="kanban__card-company">{job.company}</p>
      </header>

      <div className="kanban__card-meta">
        {job.location && <span>{job.location}</span>}
        {job.salary && <span>{job.salary}</span>}
      </div>
    </article>
  )
}
