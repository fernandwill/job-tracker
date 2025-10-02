import { useQuery } from '@tanstack/react-query'
import { get } from '../api/client'
import type { Job, PaginatedResponse } from '../types'

const JOBS_QUERY_KEY = ['jobs'] as const

const DEFAULT_PAGE_SIZE = 100

export const useJobs = () =>
  useQuery({
    queryKey: JOBS_QUERY_KEY,
    queryFn: () => get<PaginatedResponse<Job>>('/jobs', { params: { per_page: DEFAULT_PAGE_SIZE } }),
    staleTime: 30 * 1000,
  })

export type UseJobsResult = ReturnType<typeof useJobs>
export { JOBS_QUERY_KEY }
