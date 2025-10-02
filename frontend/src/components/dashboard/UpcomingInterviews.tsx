import { ClockIcon, MapPinIcon, VideoCameraIcon } from './icons'

const interviews = [
  {
    id: 1,
    company: 'Aurora Systems',
    role: 'Senior Product Designer',
    date: 'Tue, Jul 9',
    time: '9:30 AM',
    type: 'Virtual',
    location: 'Zoom',
  },
  {
    id: 2,
    company: 'Luma Labs',
    role: 'Product Strategist',
    date: 'Thu, Jul 11',
    time: '1:00 PM',
    type: 'Onsite',
    location: 'San Francisco HQ',
  },
  {
    id: 3,
    company: 'Northwind Tech',
    role: 'Design Manager',
    date: 'Mon, Jul 15',
    time: '11:00 AM',
    type: 'Virtual',
    location: 'Google Meet',
  },
]

const calendarDays = [
  { label: 'Mon', date: 8 },
  { label: 'Tue', date: 9, isActive: true },
  { label: 'Wed', date: 10 },
  { label: 'Thu', date: 11, isHighlighted: true },
  { label: 'Fri', date: 12 },
  { label: 'Sat', date: 13 },
  { label: 'Sun', date: 14 },
]

export const UpcomingInterviews = () => {
  return (
    <section className="upcoming-interviews" aria-labelledby="upcoming-interviews-heading">
      <header className="upcoming-interviews__header">
        <div>
          <p className="upcoming-interviews__eyebrow">Calendar</p>
          <h2 id="upcoming-interviews-heading">Upcoming interviews</h2>
        </div>

        <button type="button" className="upcoming-interviews__view-calendar">
          View full calendar
        </button>
      </header>

      <div className="upcoming-interviews__calendar" aria-label="This week">
        {calendarDays.map((day) => (
          <div
            key={day.date}
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

      <ul className="upcoming-interviews__list">
        {interviews.map((interview) => (
          <li key={interview.id} className="upcoming-interviews__item">
            <div className="upcoming-interviews__item-header">
              <p className="upcoming-interviews__item-company">{interview.company}</p>
              <p className="upcoming-interviews__item-role">{interview.role}</p>
            </div>

            <div className="upcoming-interviews__item-meta">
              <span>
                <ClockIcon aria-hidden="true" />
                {interview.date} · {interview.time}
              </span>
              <span>
                {interview.type === 'Virtual' ? <VideoCameraIcon aria-hidden="true" /> : <MapPinIcon aria-hidden="true" />}
                {interview.type === 'Virtual' ? interview.location : `${interview.type} · ${interview.location}`}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
