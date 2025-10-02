import type { SVGProps } from 'react'

const baseIconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const satisfies SVGProps<SVGSVGElement>

type IconProps = Omit<SVGProps<SVGSVGElement>, 'xmlns'>

export const SparklesIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...baseIconProps} {...props}>
    <path d="M11.5 3.2 13 7.7h4.5l-3.7 2.7 1.5 4.5-3.8-2.8-3.8 2.8 1.5-4.5L5.5 7.7H10L11.5 3.2z" />
    <path d="M5.25 4.75 5.9 6.5h1.75l-1.45 1.05.55 1.75-1.5-1.1-1.5 1.1.55-1.75L3 6.5h1.75l.5-1.75z" />
    <path d="m18.75 5.25.65 1.75h1.75l-1.45 1.05.55 1.75-1.5-1.1-1.5 1.1.55-1.75L16.5 7h1.75l.5-1.75z" />
  </svg>
)

export const CalendarDaysIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...baseIconProps} {...props}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
    <path d="M7 3.5V6m10-2.5V6M3.5 9.5h17M8.5 13h3m-3 4h3m4-4h3" />
  </svg>
)

export const PlusIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...baseIconProps} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const FunnelIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...baseIconProps} {...props}>
    <path d="M4.5 6h15L14 12.25v5.5l-4 1.75v-7.25L4.5 6z" />
  </svg>
)

export const ClockIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...baseIconProps} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l2.75 2.75" />
  </svg>
)

export const MapPinIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...baseIconProps} {...props}>
    <path d="M12 20.25s6-4.5 6-9.25a6 6 0 0 0-12 0c0 4.75 6 9.25 6 9.25z" />
    <circle cx="12" cy="11" r="2.25" />
  </svg>
)

export const VideoCameraIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...baseIconProps} {...props}>
    <rect x="3.5" y="6.5" width="11.5" height="11" rx="2.25" />
    <path d="m14.5 10 4-2.5v8.5l-4-2.5" />
  </svg>
)
