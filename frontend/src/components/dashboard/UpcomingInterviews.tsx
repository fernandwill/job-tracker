import { useMemo } from 'react'
import { useUpcomingInterviews } from '../../hooks/useUpcomingInterviews'
import type { UpcomingInterview as UpcomingInterviewType } from '../../types'
import { ClockIcon, MapPinIcon, VideoCameraIcon } from './icons'

type CalendarDay = {
  label: string
  date: number
  dateObj: Date
  key: string
  isActive: boolean
  isHighlighted: boolean
}

const getStartOfWeek = (date: Date) => {
  const day = date.getDay()
  const distanceFromMonday = (day + 6) % 7
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  start.setDate(date.getDate() - distanceFromMonday)
  return start
}

const buildCalendarDays = (today: Date, highlightDate?: Date | null): CalendarDay[] => {
  const startOfWeek = getStartOfWeek(today)

  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + index)

    const isSameDay = (first: Date, second?: Date | null) =>
      !!second && first.toDateString() === second.toDateString()

    return {
      label: day.toLocaleDateString(undefined, { weekday: 'short' }),
      date: day.getDate(),
      dateObj: day,
      key: day.toISOString(),
      isActive: isSameDay(day, today),
      isHighlighted: isSameDay(day, highlightDate ?? null),
    }
  })
}

const formatInterviewDate = (date: Date) =>
  date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })

const formatInterviewTime = (date: Date) =>
  date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })

const getFormatLabel = (format: UpcomingInterviewType['format']) =>
  (format === 'virtual' ? 'Virtual' : 'Onsite')

const isVirtualInterview = (format: UpcomingInterviewType['format']) => format === 'virtual'

export const UpcomingInterviews = () => {
  const upcomingInterviewsQuery = useUpcomingInterviews()

  const interviews = useMemo(() => {
    const rawInterviews = upcomingInterviewsQuery.data ?? []

    return rawInterviews
      .map((interview) => ({
        ...interview,
        scheduledAt: new Date(interview.scheduled_at),
      }))
      .sort((first, second) => first.scheduledAt.getTime() - second.scheduledAt.getTime())
  }, [upcomingInterviewsQuery.data])

  const nextInterviewDate = interviews[0]?.scheduledAt ?? null
  const calendarDays = useMemo(() => {
    const now = new Date()
    return buildCalendarDays(now, nextInterviewDate)
  }, [nextInterviewDate])

  const listContent = () => {
    if (upcomingInterviewsQuery.isLoading) {
      return <p className="upcoming-interviews__placeholder">Loading upcoming interviews…</p>
    }

    if (upcomingInterviewsQuery.isError) {
      return (
        <p className="upcoming-interviews__placeholder" role="alert">
          We couldn’t load your interviews right now. Please try again soon.
        </p>
      )
    }

    if (interviews.length === 0) {
      return <p className="upcoming-interviews__placeholder">No interviews scheduled yet.</p>
    }

    return (
      <ul className="upcoming-interviews__list">
        {interviews.map((interview) => {
          const typeLabel = getFormatLabel(interview.format)
          const isVirtual = isVirtualInterview(interview.format)

          return (
            <li key={interview.id} className="upcoming-interviews__item">
              <div className="upcoming-interviews__item-header">
                <p className="upcoming-interviews__item-company">{interview.company}</p>
                <p className="upcoming-interviews__item-role">{interview.role}</p>
              </div>

              <div className="upcoming-interviews__item-meta">
                <span>
                  <ClockIcon aria-hidden="true" />
                  {formatInterviewDate(interview.scheduledAt)} · {formatInterviewTime(interview.scheduledAt)}
                </span>
                <span>
                  {isVirtual ? <VideoCameraIcon aria-hidden="true" /> : <MapPinIcon aria-hidden="true" />}
                  {isVirtual ? interview.location : `${typeLabel} · ${interview.location}`}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  const calendarLabel = calendarDays.length
    ? `Week of ${calendarDays[0].dateObj.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })}`
    : 'This week'

  return (
    <section className="upcoming-interviews" aria-labelledby="upcoming-interviews-heading">
      <header className="upcoming-interviews__header">
        <div>
          <h2 id="upcoming-interviews-heading">Upcoming interviews</h2>
        </div>

        <button type="button" className="upcoming-interviews__view-calendar">
          View full calendar
        </button>
      </header>

      <div className="upcoming-interviews__calendar" aria-label={calendarLabel}>
        {calendarDays.map((day) => (
          <div
            key={day.key}
            className={[
              'upcoming-interviews__calendar-day',
              day.isActive ? 'upcoming-interviews__calendar-day--active' : '',
              day.isHighlighted ? 'upcoming-interviews__calendar-day--highlighted' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span>{day.label}</span>
            <strong>{day.date}</strong>
          </div>
        ))}
      </div>

      {listContent()}
    </section>
  )
}
