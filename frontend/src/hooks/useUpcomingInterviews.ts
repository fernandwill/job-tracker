import { useQuery } from '@tanstack/react-query'
import { get } from '../api/client'
import type { UpcomingInterview } from '../types'

const UPCOMING_INTERVIEWS_QUERY_KEY = ['interviews', 'upcoming'] as const

export const useUpcomingInterviews = () =>
  useQuery({
    queryKey: UPCOMING_INTERVIEWS_QUERY_KEY,
    queryFn: () => get<UpcomingInterview[]>('/interviews/upcoming'),
    staleTime: 30 * 1000,
  })

export type UseUpcomingInterviewsResult = ReturnType<typeof useUpcomingInterviews>
export { UPCOMING_INTERVIEWS_QUERY_KEY }
