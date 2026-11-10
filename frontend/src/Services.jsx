export default function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <div className="container services__inner">
        <header className="services__header">
          <p className="services__label">WHAT WE DO</p>
          <span className="services__accent" aria-hidden="true" />
          <h2 className="services__heading" id="services-heading">Our Services</h2>
          <p className="services__subtitle">Spare parts, repair and fitting for your electric vehicle.</p>
        </header>

        <div className="services__grid">
          <article className="services__card" tabIndex="0">
            <div className="services__icon" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none" focusable="false">
                <path d="m27 8 10 1 2 8 7 4 8-2 5 9-6 6v8l6 6-6 9-8-3-7 4-2 8H26l-2-8-7-4-8 3-5-9 6-6v-8l-6-6 5-9 8 2 7-4 3-9Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                <circle cx="32" cy="32" r="11" stroke="#65D510" strokeWidth="4" />
              </svg>
            </div>
            <div className="services__card-content">
              <h3 className="services__card-heading">Spare Parts Sales</h3>
              <p className="services__card-copy">Spare parts for e-rickshaws and electric scooters.</p>
            </div>
          </article>

          <article className="services__card" tabIndex="0">
            <div className="services__icon" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none" focusable="false">
                <path d="M26 35 10 51a5 5 0 0 0 7 7l16-16M38 29l12-12 7-1-1 7-12 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 9c-2 8 1 15 8 18 4 2 8 1 11-1l21 26a5 5 0 0 0 8-6L36 22c1-4 0-8-3-11-4-4-9-5-14-3l8 8-8 8-9-8c-1-2-1-5 2-7Z" stroke="#65D510" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="services__card-content">
              <h3 className="services__card-heading">Repair Services</h3>
              <p className="services__card-copy">Visit our shop to discuss your vehicle’s repair requirements.</p>
            </div>
          </article>

          <article className="services__card" tabIndex="0">
            <div className="services__icon" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none" focusable="false">
                <path d="M24 9h11l2 8 7 3 7-3 6 9-6 6v5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M24 9 22 17l-7 3-7-3-5 9 5 6v8l-5 6 5 9 7-3 7 3 3-7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M25 25c6-5 15-4 20 2 4 5 4 12 1 17l12 12a5 5 0 0 1-7 7L39 51c-6 3-13 1-17-4-4-6-3-14 2-19l8 8 7-7-8-8c-2 1-4 2-6 4Z" stroke="#65D510" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="services__card-content">
              <h3 className="services__card-heading">Parts Fitting</h3>
              <p className="services__card-copy">Get fitting services for your e-rickshaw and electric scooter parts.</p>
            </div>
          </article>
        </div>

        <div className="services__actions">
          <a className="services__button" href="#contact">
            Contact Us for Service
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
