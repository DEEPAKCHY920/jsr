export default function NotFound() {
  return (
    <main className="nf" aria-labelledby="nf-heading">
      {/* animated background sparks */}
      <div className="nf__bg" aria-hidden="true">
        <span className="nf__spark nf__spark--1" />
        <span className="nf__spark nf__spark--2" />
        <span className="nf__spark nf__spark--3" />
        <span className="nf__spark nf__spark--4" />
      </div>

      <div className="nf__card">
        {/* EV bolt icon */}
        <div className="nf__icon" aria-hidden="true">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" stroke="#1746CE" strokeWidth="3" />
            <path
              d="M36 10L18 36h14l-4 18L50 28H36L40 10z"
              fill="#65D510"
              stroke="#1746CE"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 404 number */}
        <p className="nf__code" aria-hidden="true">404</p>

        <h1 className="nf__heading" id="nf-heading">
          Page Not Found
        </h1>
        <p className="nf__sub">
          Looks like this part isn't in our stock! The page you're looking for
          doesn't exist or has been moved.
        </p>

        <div className="nf__actions">
          <a href="/" className="nf__btn nf__btn--primary">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path d="M3 12L12 3l9 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </a>
          <a href="/#contact" className="nf__btn nf__btn--secondary">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.03 1.18 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Contact Us
          </a>
        </div>

        {/* brand strip */}
        <div className="nf__brand">
          <span className="nf__brand-name">JSR EV</span>
          <span className="nf__brand-sep" aria-hidden="true" />
          <span className="nf__brand-tag">SPARE PARTS</span>
        </div>
      </div>
    </main>
  );
}

