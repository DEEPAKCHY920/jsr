const stockParts = [
  { id: "motor", name: "Motor", img: "/parts/motor.png", width: 70, height: 50, alt: "Electric rickshaw motor" },
  { id: "controller", name: "Controller", img: "/parts/controller.png", width: 70, height: 50, alt: "E-rickshaw speed controller" },
  { id: "battery-charger", name: "Battery Charger", img: "/parts/battery-charger.png", width: 70, height: 50, alt: "E-rickshaw battery charger" },
  { id: "differential", name: "Differential", img: "/parts/differential.png", width: 70, height: 50, alt: "E-rickshaw rear axle differential gear" },
  { id: "brake-shoes", name: "Brake Shoes", img: "/parts/brake-shoes.png", width: 70, height: 50, alt: "E-rickshaw brake shoes" },
  { id: "shocker", name: "Shocker", img: "/parts/shocker.png", width: 70, height: 50, alt: "E-rickshaw suspension shocker" },
  { id: "tyres", name: "Tyres", img: "/parts/tyres.png", width: 70, height: 50, alt: "Electric rickshaw durable tyres" },
  { id: "wiring-kit", name: "Wiring Kit", img: "/parts/wiring-kit.png", width: 70, height: 46, alt: "E-rickshaw full wiring harness kit" },
  { id: "dc-converter", name: "DC Converter", img: "/parts/dc-converter.png", width: 70, height: 46, alt: "E-rickshaw DC to DC converter" },
  { id: "headlight", name: "Headlight", img: "/parts/headlight.png", width: 70, height: 46, alt: "E-rickshaw bright LED headlight" },
  { id: "tail-light", name: "Tail Light", img: "/parts/tail-light.png", width: 70, height: 46, alt: "E-rickshaw tail light lamp" },
  { id: "accelerator", name: "Accelerator", img: "/parts/accelerator.png", width: 70, height: 46, alt: "E-rickshaw accelerator pedal throttle" },
  { id: "battery-packs", name: "Battery Packs", img: "/parts/battery-packs.png", width: 70, height: 46, alt: "E-rickshaw heavy duty battery pack" },
];

const trustFeatures = [
  {
    id: "genuine-parts",
    title: "Genuine Parts",
    sub: "100% Original & Reliable",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "repair-fitting",
    title: "Repair & Fitting",
    sub: "Expert Service Support",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "fast-service",
    title: "Fast Service",
    sub: "Quick Turnaround Time",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: "trusted-shop",
    title: "Trusted Shop",
    sub: "In Rohini, Delhi",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-heading">
      <div className="container services__inner">
        <header className="services__header reveal-up">
          <p className="services__label">WHAT WE DO</p>
          <span className="services__accent" aria-hidden="true" />
          <h2 className="services__heading" id="services-heading">Our Services</h2>
          <p className="services__subtitle">Spare parts, vehicle servicing and parts fitting for your electric vehicle.</p>
        </header>

        <div className="services__grid reveal-stagger">
          <article className="services__card reveal-up" tabIndex="0">
            <div className="services__icon" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none" focusable="false">
                <path d="m27 8 10 1 2 8 7 4 8-2 5 9-6 6v8l6 6-6 9-8-3-7 4-2 8H26l-2-8-7-4-8 3-5-9 6-6v-8l-6-6 5-9 8 2 7-4 3-9Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                <circle cx="32" cy="32" r="11" stroke="#65D510" strokeWidth="4" />
              </svg>
            </div>
            <div className="services__card-content">
              <h3 className="services__card-heading">Spare Parts Sales</h3>
              <p className="services__card-copy">Spare parts for e-rickshaws and electric scooters.</p>
              <a
                href="https://wa.me/919990120067?text=Hi%20JSR%20EV%2C%20I%20want%20to%20check%20availability%20of%20spare%20parts."
                target="_blank"
                rel="noopener noreferrer"
                className="services__card-action"
                aria-label="Check spare parts availability on WhatsApp (opens in a new tab)"
              >
                <span>Check Availability</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </article>

          <article className="services__card reveal-up" tabIndex="0">
            <div className="services__icon" aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none" focusable="false">
                <path d="M26 35 10 51a5 5 0 0 0 7 7l16-16M38 29l12-12 7-1-1 7-12 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 9c-2 8 1 15 8 18 4 2 8 1 11-1l21 26a5 5 0 0 0 8-6L36 22c1-4 0-8-3-11-4-4-9-5-14-3l8 8-8 8-9-8c-1-2-1-5 2-7Z" stroke="#65D510" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="services__card-content">
              <h3 className="services__card-heading">Repair Services</h3>
              <p className="services__card-copy">Visit our shop to discuss your vehicle’s repair requirements.</p>
              <a
                href="tel:+919990120067"
                className="services__card-action"
                aria-label="Call JSR EV to discuss repair services and pricing"
              >
                <span>Call for Price</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </article>

          <article className="services__card reveal-up" tabIndex="0">
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
              <a
                href="https://wa.me/919990120067?text=Hello%20JSR%20EV%2C%20I%20would%20like%20to%20enquire%20about%20fitting%20charges%20for%20my%20electric%20vehicle."
                target="_blank"
                rel="noopener noreferrer"
                className="services__card-action"
                aria-label="Enquire about parts fitting charges on WhatsApp (opens in a new tab)"
              >
                <span>Check Fitting Price</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </article>
        </div>

        {/* Redesigned Spare Parts We Stock Section */}
        <section className="stock-parts reveal-up" id="spare-parts" aria-labelledby="stock-parts-heading">
          {/* Centered Brand Heading & Eyebrow */}
          <div className="stock-parts__brand-tag">
            <span className="stock-parts__brand-line" aria-hidden="true" />
            <div className="stock-parts__brand-badge">
              <span className="stock-parts__brand-name">JSR EV</span>
              <span className="stock-parts__brand-sub">SPARE PARTS</span>
            </div>
            <span className="stock-parts__brand-line" aria-hidden="true" />
          </div>

          <h3 className="stock-parts__heading" id="stock-parts-heading">
            <span className="stock-parts__heading-main">Spare Parts</span>{" "}
            <span className="stock-parts__heading-highlight">
              We Stock
              <svg className="stock-parts__swoosh" viewBox="0 0 140 16" fill="none" aria-hidden="true" focusable="false">
                <path d="M4 12C45 3 95 3 136 12" stroke="#63D817" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h3>

          <p className="stock-parts__subtitle">
            A complete range of genuine spare parts for e-rickshaws – repair, replacement and upgrade, all in one place.
          </p>

          {/* Main Visual Showcase (Product Cards Grid + Blue E-Rickshaw Visual) */}
          <div className="stock-parts__showcase">
            <div className="stock-parts__cards-col">
              <div className="stock-parts__grid" role="list" aria-label="Spare parts in stock">
                {stockParts.map((part) => (
                  <div key={part.id} className="stock-parts__card" role="listitem">
                    <div className="stock-parts__img-wrap">
                      <img
                        src={part.img}
                        alt={part.alt}
                        width={part.width}
                        height={part.height}
                        loading="lazy"
                        className="stock-parts__img"
                      />
                    </div>
                    <span className="stock-parts__name">{part.name}</span>
                    <span className="stock-parts__bar" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>

            <div className="stock-parts__vehicle-col">
              <img
                src="/parts/blue-erickshaw.png"
                alt="Modern blue electric rickshaw for spare parts and fitting"
                width="275"
                height="225"
                loading="lazy"
                className="stock-parts__vehicle-img"
              />
            </div>
          </div>

          {/* Prominent Contact Us for Service Button */}
          <div className="stock-parts__cta-wrap">
            <a href="#contact" className="stock-parts__cta-btn" aria-label="Contact JSR EV for service">
              <svg className="stock-parts__cta-icon-left" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <span>Contact Us for Service</span>
              <svg className="stock-parts__cta-icon-right" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Bottom Trust Strip */}
          <div className="stock-parts__trust-strip" aria-label="Shop guarantees and service features">
            {trustFeatures.map((item) => (
              <div key={item.id} className="stock-parts__trust-item">
                <div className="stock-parts__trust-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <div className="stock-parts__trust-text">
                  <strong className="stock-parts__trust-title">{item.title}</strong>
                  <span className="stock-parts__trust-sub">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
