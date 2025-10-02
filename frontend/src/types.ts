export interface JobStatus {
  id: number
  name: string
  slug: string
  sort_order: number
  is_default: boolean
}

export interface JobNote {
  id: number
  body: string
  created_at: string | null
  updated_at: string | null
}

export interface Job {
  id: number
  title: string
  company: string
  location: string | null
  salary: string | null
  applied_at: string | null
  posting_url: string | null
  job_status_id: number
  status?: JobStatus | null
  notes?: JobNote[]
  created_at: string | null
  updated_at: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  links?: Record<string, string | null>
  meta?: {
    current_page: number
    from: number | null
    last_page: number
    path?: string
    per_page: number
    to: number | null
    total: number
  }
}
