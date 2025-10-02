import { CalendarDaysIcon} from './icons'

export const HeroHeader = () => {
  return (
    <header className="hero-header" aria-labelledby="hero-heading">
      <div className="hero-header__content">
        <div className="hero-header__headline">
          <h1 id="hero-heading">Good morning, Alex</h1>
          <p>
            Track applications, collaborate with referrals, and keep interviews organized in a single
            streamlined workspace.
          </p>
        </div>

        <div className="hero-header__actions">
          <button className="hero-header__cta hero-header__cta--primary" type="button">
            Add application
          </button>
          <button className="hero-header__cta" type="button">
            Share pipeline
          </button>
        </div>
      </div>

      <div className="hero-header__stats" aria-label="Pipeline summary">
        <div className="hero-header__stat-card">
          <span className="hero-header__stat-label">Active applications</span>
          <strong className="hero-header__stat-value">18</strong>
          <span className="hero-header__stat-trend">+3 since last week</span>
        </div>

        <div className="hero-header__stat-card">
          <span className="hero-header__stat-label">Interviews scheduled</span>
          <strong className="hero-header__stat-value">4</strong>
          <span className="hero-header__stat-trend hero-header__stat-trend--positive">
            <CalendarDaysIcon aria-hidden="true" />
            Next on Jul 11
          </span>
        </div>
      </div>
    </header>
  )
}
