import { useQuery } from '@tanstack/react-query'
import { get } from '../api/client'
import type { JobStatus } from '../types'

const JOB_STATUSES_QUERY_KEY = ['job-statuses'] as const

export const useJobStatuses = () =>
  useQuery({
    queryKey: JOB_STATUSES_QUERY_KEY,
    queryFn: () => get<JobStatus[]>('/job-statuses'),
    select: (statuses) => [...statuses].sort((a, b) => a.sort_order - b.sort_order),
    staleTime: 5 * 60 * 1000,
  })

export type UseJobStatusesResult = ReturnType<typeof useJobStatuses>
