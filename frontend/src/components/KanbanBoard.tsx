import { useMemo } from 'react'
import { useDndMonitor } from '@dnd-kit/core'
import { Column } from './Column'
import { useJobStatuses } from '../hooks/useJobStatuses'
import { useJobs } from '../hooks/useJobs'
import { useUpdateJobStatus } from '../hooks/useUpdateJobStatus'

type DragData = {
  type: 'job'
  jobId: number
  statusId: number
}

type DroppableData = {
  type: 'column' | 'job'
  statusId: number
}

export const KanbanBoard = () => {
  const jobStatusesQuery = useJobStatuses()
  const jobsQuery = useJobs()
  const updateJobStatus = useUpdateJobStatus()

  const statuses = jobStatusesQuery.data ?? []
  const jobs = jobsQuery.data?.data ?? []

  const columns = useMemo(
    () =>
      statuses.map((status) => ({
        status,
        jobs: jobs.filter((job) => job.job_status_id === status.id),
      })),
    [statuses, jobs],
  )

  useDndMonitor({
    onDragEnd: (event) => {
      const activeData = event.active.data.current as DragData | undefined
      const overData = event.over?.data.current as DroppableData | undefined

      if (!activeData || activeData.type !== 'job' || !event.over) {
        return
      }

      const nextStatusId = overData?.statusId

      if (!nextStatusId || nextStatusId === activeData.statusId) {
        return
      }

      updateJobStatus.mutate({
        jobId: activeData.jobId,
        job_status_id: nextStatusId,
      })
    },
  })

  if (jobStatusesQuery.isLoading || jobsQuery.isLoading) {
    return <div className="kanban__placeholder">Loading your pipeline…</div>
  }

  if (jobStatusesQuery.isError || jobsQuery.isError) {
    return (
      <div className="kanban__placeholder" role="alert">
        We ran into a problem loading your applications. Please try again shortly.
      </div>
    )
  }

  if (statuses.length === 0) {
    return (
      <div className="kanban__placeholder">
        No statuses are configured yet. Create statuses in the dashboard to start tracking jobs.
      </div>
    )
  }

  const hasJobs = jobs.length > 0

  return (
    <div className="kanban__content">
      <div className="kanban__columns" role="list">
        {columns.map(({ status, jobs: statusJobs }) => (
          <Column key={status.id} status={status} jobs={statusJobs} />
        ))}
      </div>

      {!hasJobs && (
        <p className="kanban__empty-board">
          No job applications yet. Add an opportunity to see it appear on this board.
        </p>
      )}
    </div>
  )
}
