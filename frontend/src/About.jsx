import founderPortrait from "../assets/images/founder-deepak-choudhary.webp";

export default function About() {
  const whatsappUrl =
    "https://wa.me/919990120067?text=Hello%20Deepak%20ji%2C%20I%20would%20like%20to%20enquire%20about%20e-rickshaw%20spare%20parts.";

  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="container about__container">
        {/* Intro Header */}
        <div className="about__header reveal-up">
          <div className="about__label-row">
            <p className="about__label">ABOUT OUR SHOP</p>
            <span className="about__label-line" aria-hidden="true" />
          </div>
          <h2 className="about__heading" id="about-heading">
            About JSR EV SPARE PARTS
          </h2>
          <p className="about__copy">
            Established in 2024, JSR EV SPARE PARTS is a trusted local shop in Sector 18, Rohini, Delhi, supplying genuine spare parts, expert repair and dependable fitting services for e-rickshaws and electric scooters. We cater to retail vehicle owners, independent mechanics and commercial fleet operators across North Delhi.
          </p>
        </div>

        {/* Two-Column Row: Left = Shop Photo, Right = Founder Card */}
        <div className="about__grid">
          {/* Left Column: Physical Shop Photo (Aspect-ratio 4/3, signboard visible) */}
          <div className="about__media reveal-up">
            <div className="about__photo-wrapper">
              <img
                src="/shop.jpg"
                alt="JSR EV Spare Parts physical shop front with JSR EV SPARE PARTS signboard in Sector 18, Rohini, Delhi"
                className="about__photo"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
            </div>
            <span className="about__photo-caption">JSR EV SPARE PARTS — Our Physical Shop in Sector 18, Rohini</span>
          </div>

          {/* Right Column: Founder Feature Card */}
          <article className="founder-card reveal-up" aria-labelledby="founder-name">
            <div className="founder-card__portrait-col">
              <div className="founder-card__portrait-frame">
                <span className="founder-card__corner founder-card__corner--top" aria-hidden="true" />
                <span className="founder-card__corner founder-card__corner--bottom" aria-hidden="true" />
                <img
                  src={founderPortrait}
                  alt="Deepak Choudhary, founder of JSR EV SPARE PARTS"
                  className="founder-card__img"
                  width="200"
                  height="200"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="founder-card__content-col">
              <h3 className="founder-card__name" id="founder-name">
                Deepak Choudhary
              </h3>
              <p className="founder-card__role">Founder, JSR EV SPARE PARTS</p>
              <p className="founder-card__bio">
                Deepak Choudhary leads JSR EV SPARE PARTS, helping vehicle owners and mechanics find original, reliable spares and on-site fitting solutions.
              </p>

              <div className="founder-card__chips" role="list">
                <span className="founder-card__chip" role="listitem">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Since 2024
                </span>
                <span className="founder-card__chip" role="listitem">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  Sector 18, Rohini
                </span>
              </div>

              <div className="founder-card__actions">
                <a
                  href="tel:+919990120067"
                  className="founder-card__btn founder-card__btn--call"
                  aria-label="Call Deepak Choudhary at +91 9990120067"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  Call Now
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="founder-card__btn founder-card__btn--wa"
                  aria-label="Chat with Deepak Choudhary on WhatsApp"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
