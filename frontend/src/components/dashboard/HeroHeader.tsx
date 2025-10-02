import type { ReactNode } from 'react'

type HeroHeaderEyebrow = {
  icon?: ReactNode
  text: string
}

type HeroHeaderAction = {
  label: string
  variant?: 'primary' | 'secondary'
  icon?: ReactNode
  onClick?: () => void
}

type HeroHeaderStat = {
  label: string
  value: string
  trend?: {
    text: string
    positive?: boolean
    icon?: ReactNode
  }
}

export type HeroHeaderProps = {
  eyebrow?: HeroHeaderEyebrow
  title: string
  description?: string
  actions?: HeroHeaderAction[]
  stats?: HeroHeaderStat[]
}

export const HeroHeader = ({
  eyebrow,
  title,
  description,
  actions = [],
  stats = [],
}: HeroHeaderProps) => {
  return (
    <header className="hero-header" aria-labelledby="hero-heading">
      <div className="hero-header__content">
        {eyebrow ? (
          <div className="hero-header__eyebrow">
            {eyebrow.icon}
            <span>{eyebrow.text}</span>
          </div>
        ) : null}

        <div className="hero-header__headline">
          <h1 id="hero-heading">{title}</h1>
          {description ? <p>{description}</p> : null}
        </div>

        {actions.length > 0 ? (
          <div className="hero-header__actions">
            {actions.map(({ label, variant = 'secondary', icon, onClick }) => (
              <button
                key={label}
                className={`hero-header__cta${variant === 'primary' ? ' hero-header__cta--primary' : ''}`}
                type="button"
                onClick={onClick}
              >
                {icon ? (
                  <span aria-hidden="true" className="hero-header__cta-icon">
                    {icon}
                  </span>
                ) : null}
                <span className="hero-header__cta-label">{label}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {stats.length > 0 ? (
        <div className="hero-header__stats" aria-label="Pipeline summary">
          {stats.map(({ label, value, trend }) => (
            <div className="hero-header__stat-card" key={label}>
              <span className="hero-header__stat-label">{label}</span>
              <strong className="hero-header__stat-value">{value}</strong>
              {trend ? (
                <span
                  className={`hero-header__stat-trend${trend.positive ? ' hero-header__stat-trend--positive' : ''}`}
                >
                  {trend.icon ? (
                    <span aria-hidden="true" className="hero-header__stat-trend-icon">
                      {trend.icon}
                    </span>
                  ) : null}
                  <span>{trend.text}</span>
                </span>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </header>
  )
}
