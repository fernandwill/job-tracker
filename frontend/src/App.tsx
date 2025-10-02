import { useMemo, useState } from 'react'
import './App.css'
import { HeroHeader, type HeroHeaderProps } from './components/dashboard/HeroHeader'
import { ApplicationsBoard, type ApplicationsBoardProps } from './components/dashboard/ApplicationsBoard'
import {
  CalendarDaysIcon,
  FunnelIcon,
  PlusIcon,
  SparklesIcon,
} from './components/dashboard/icons'

export default function App() {
  const [user] = useState(() => ({
    firstName: 'Alex',
    metrics: {
      activeApplications: 18,
      weeklyDelta: 3,
      interviewsScheduled: 4,
      nextInterviewLabel: 'Jul 11',
    },
  }))

  const heroHeaderContent = useMemo(
    () => ({
      eyebrow: {
        icon: <SparklesIcon aria-hidden="true" />,
        text: 'Career workspace',
      },
      title: `Good morning, ${user.firstName}`,
      description:
        'Track applications, collaborate with referrals, and keep interviews organized in a single streamlined workspace.',
      actions: [
        { label: 'Add application', variant: 'primary' },
        { label: 'Share pipeline' },
      ],
      stats: [
        {
          label: 'Active applications',
          value: user.metrics.activeApplications.toString(),
          trend: {
            text: `${user.metrics.weeklyDelta >= 0 ? '+' : ''}${user.metrics.weeklyDelta} since last week`,
          },
        },
        {
          label: 'Interviews scheduled',
          value: user.metrics.interviewsScheduled.toString(),
          trend: {
            text: `Next on ${user.metrics.nextInterviewLabel}`,
            positive: true,
            icon: <CalendarDaysIcon aria-hidden="true" />,
          },
        },
      ],
    }) satisfies HeroHeaderProps,
    [user]
  )

  const applicationsBoardContent = useMemo(
    () => ({
      eyebrow: 'Pipeline overview',
      title: 'Applications board',
      description:
        'Drag cards between stages to keep each opportunity up to date. Everything stays in sync across your team.',
      actions: [
        {
          label: 'New application',
          variant: 'primary',
          icon: <PlusIcon aria-hidden="true" />,
        },
        {
          label: 'Filter',
          icon: <FunnelIcon aria-hidden="true" />,
        },
      ],
    }) satisfies ApplicationsBoardProps,
    []
  )

  return (
    <div className="app-shell">
      <HeroHeader {...heroHeaderContent} />

      <main className="dashboard-grid">
        <div className="dashboard-grid__column">
          <ApplicationsBoard {...applicationsBoardContent} />
        </div>
      </main>
    </div>
  )
}

