import OpenNowBadge from "./OpenNowBadge.jsx";

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="container hero__inner">
        <div className="hero__text">
          {/* Eyebrow Row with EV Badge & Real-Time Open Status */}
          <div className="hero__eyebrow-row">
            <div className="hero__badge">
              <svg className="hero__badge-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path d="M13 2L3 14h8l-2 8 11-13h-8l3-7z" fill="#65D510" stroke="#65D510" strokeWidth="1" strokeLinejoin="round" />
              </svg>
              <span>E-Rickshaw &amp; Electric Scooter Spare Parts</span>
            </div>
            <OpenNowBadge />
          </div>

          {/* Main Heading with curved underline */}
          <h1 className="hero__heading" id="hero-heading">
            <span className="hero__heading-sub">Your Destination for</span>
            <span className="hero__heading-highlight">
              E-Rickshaw Spare Parts
              <svg className="hero__heading-curve" viewBox="0 0 260 14" fill="none" aria-hidden="true" focusable="false">
                <path d="M3 10C65 3 175 3 257 10" stroke="#65D510" strokeWidth="4.5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero__desc">
            Genuine spare parts, repair and fitting services for e-rickshaws and electric scooters.
          </p>

          {/* Action Buttons */}
          <div className="hero__actions">
            <a
              href="https://wa.me/919990120067?text=Hello%20JSR%20EV%20SPARE%20PARTS%2C%20I%20would%20like%20to%20enquire%20about%20spare%20parts%20or%20services."
              className="hero__btn hero__btn--whatsapp"
              aria-label="Send JSR EV Spare Parts a WhatsApp enquiry (opens in a new tab)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="hero__btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" />
              </svg>
              WhatsApp Enquiry
            </a>

            <a
              href="tel:+919990120067"
              className="hero__btn hero__btn--call"
              aria-label="Call JSR EV Spare Parts"
            >
              <svg className="hero__btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Call Now
            </a>
          </div>

          {/* Trust Features Strip */}
          <div className="hero__features" role="list">
            <div className="hero__feature-item" role="listitem">
              <svg className="hero__feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span>Genuine Parts</span>
            </div>

            <div className="hero__feature-divider" aria-hidden="true" />

            <div className="hero__feature-item" role="listitem">
              <svg className="hero__feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span>Fast Service</span>
            </div>

            <div className="hero__feature-divider" aria-hidden="true" />

            <div className="hero__feature-item" role="listitem">
              <svg className="hero__feature-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <span>Repair &amp; Fitting</span>
            </div>
          </div>
        </div>

        {/* Right Graphic Banner with EV Charge Pulse Glow */}
        <div className="hero__image-wrap">
          <div className="hero__glow-accent" aria-hidden="true" />
          <img
            src="/hero-ev-banner.png"
            alt="Blue e-rickshaw with motor, controller, brake shoes and tyre spare parts"
            className="hero__banner-img"
            width="552"
            height="402"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
