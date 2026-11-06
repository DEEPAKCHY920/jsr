import founderPortrait from "../assets/images/founder-deepak-choudhary.webp";

export default function Founder() {
  return (
    <section className="founder" id="founder" aria-labelledby="founder-heading">
      <span
        className="founder__decoration founder__decoration--top"
        aria-hidden="true"
      />
      <span
        className="founder__decoration founder__decoration--bottom"
        aria-hidden="true"
      />

      <div className="container founder__inner">
        <div className="founder__portrait-wrap">
          <span className="founder__corner founder__corner--top" aria-hidden="true" />
          <span className="founder__corner founder__corner--bottom" aria-hidden="true" />
          <img
            className="founder__portrait"
            src={founderPortrait}
            alt="Deepak Choudhary, founder of JSR EV SPARE PARTS"
            width="340"
            height="340"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="founder__content">
          <div className="founder__label-row">
            <p className="founder__eyebrow">MEET OUR FOUNDER</p>
            <span className="founder__label-line" aria-hidden="true" />
          </div>

          <h2 className="founder__heading" id="founder-heading">
            Deepak Choudhary
          </h2>
          <p className="founder__designation">Founder · JSR EV SPARE PARTS</p>

          <div className="founder__copy">
            <p>
              Deepak Choudhary is the founder of JSR EV SPARE PARTS, established in 2024
              in Sector 18, Rohini, Delhi.
            </p>
            <p>
              The shop serves retail customers, mechanics and dealers with spare parts
              for e-rickshaws and electric scooters, along with repair and fitting
              services.
            </p>
          </div>

          <ul className="founder__chips" role="list">
            <li className="founder__chip">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <rect
                  x="4"
                  y="5"
                  width="16"
                  height="15"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M8 3v4M16 3v4M4 10h16M8 14h2M14 14h2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>Established 2024</span>
            </li>
            <li className="founder__chip">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path
                  d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span>Rohini, Delhi</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
