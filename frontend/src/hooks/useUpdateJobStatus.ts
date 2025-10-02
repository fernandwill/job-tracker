import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patch } from '../api/client'
import type { Job, PaginatedResponse } from '../types'
import { JOBS_QUERY_KEY } from './useJobs'

interface UpdateJobStatusInput {
  jobId: number
  job_status_id: number
}

interface JobsQueryContext {
  previousJobs?: PaginatedResponse<Job>
}

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<Job, Error, UpdateJobStatusInput, JobsQueryContext>({
    mutationFn: ({ jobId, job_status_id }) =>
      patch<Job, Partial<Job>>(`/jobs/${jobId}`, { job_status_id }),
    onMutate: async ({ jobId, job_status_id }) => {
      await queryClient.cancelQueries({ queryKey: JOBS_QUERY_KEY })

      const previousJobs = queryClient.getQueryData<PaginatedResponse<Job>>(JOBS_QUERY_KEY)

      if (previousJobs) {
        const nextJobs: PaginatedResponse<Job> = {
          ...previousJobs,
          data: previousJobs.data.map((job) =>
            job.id === jobId ? { ...job, job_status_id } : job,
          ),
        }

        queryClient.setQueryData(JOBS_QUERY_KEY, nextJobs)
      }

      return { previousJobs }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousJobs) {
        queryClient.setQueryData(JOBS_QUERY_KEY, context.previousJobs)
      }
    },
    onSuccess: (updatedJob) => {
      queryClient.setQueryData<PaginatedResponse<Job> | undefined>(
        JOBS_QUERY_KEY,
        (current) => {
          if (!current) {
            return current
          }

          return {
            ...current,
            data: current.data.map((job) => (job.id === updatedJob.id ? updatedJob : job)),
          }
        },
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: JOBS_QUERY_KEY })
    },
  })
}

export type UseUpdateJobStatusResult = ReturnType<typeof useUpdateJobStatus>
