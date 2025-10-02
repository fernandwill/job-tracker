import { useMemo } from 'react'
import { Column } from '../components/Column'
import { useJobStatuses } from '../hooks/useJobStatuses'
import { useJobs } from '../hooks/useJobs'
import { useNavigation } from '../navigation/NavigationProvider'

interface StatusDetailPageProps {
  slug: string
}

export const StatusDetailPage = ({ slug }: StatusDetailPageProps) => {
  const { navigate } = useNavigation()
  const jobStatusesQuery = useJobStatuses()
  const jobsQuery = useJobs()

  const status = useMemo(
    () => jobStatusesQuery.data?.find((item) => item.slug === slug),
    [jobStatusesQuery.data, slug],
  )

  const jobs = jobsQuery.data?.data ?? []

  const statusJobs = useMemo(
    () => (status ? jobs.filter((job) => job.job_status_id === status.id) : []),
    [jobs, status],
  )

  if (jobStatusesQuery.isLoading || jobsQuery.isLoading) {
    return <div className="status-detail__placeholder">Loading jobs…</div>
  }

  if (!status) {
    return (
      <section className="status-detail" aria-live="polite">
        <header className="status-detail__header">
          <div>
            <p className="status-detail__eyebrow">Status overview</p>
            <h2>We couldn't find that status</h2>
            <p className="status-detail__description">
              The status you're trying to view doesn't exist. Return to the main board to continue tracking your search.
            </p>
          </div>

          <button type="button" className="status-detail__action" onClick={() => navigate('/')}>Back to board</button>
        </header>
      </section>
    )
  }

  return (
    <section className="status-detail" aria-labelledby="status-detail-heading">
      <header className="status-detail__header">
        <div>
          <p className="status-detail__eyebrow">Status overview</p>
          <h2 id="status-detail-heading">{status.name}</h2>
          <p className="status-detail__description">
            Review every job that has been marked as {status.name.toLowerCase()}. Drag a card back to a pipeline stage if you need to
            reopen the conversation.
          </p>
        </div>

        <button type="button" className="status-detail__action" onClick={() => navigate('/')}>
          Back to board
        </button>
      </header>

      <div className="status-detail__content">
        <Column status={status} jobs={statusJobs} showOutcomeSummary={false} />
      </div>
    </section>
  )
}
