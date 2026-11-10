const features = [
  {
    id: "wide-range-spares",
    title: "Wide Range of EV Spares",
    desc: "Parts for e-rickshaws and electric scooters.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2CA50D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
  {
    id: "repair-fitting",
    title: "Repair & Fitting",
    desc: "Practical support for your vehicle.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2CA50D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        <line x1="4" y1="20" x2="8" y2="16" />
      </svg>
    ),
  },
  {
    id: "part-guidance",
    title: "Helpful Part Guidance",
    desc: "Get help finding the right spare part.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2CA50D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
      </svg>
    ),
  },
  {
    id: "visit-shop",
    title: "Visit Our Shop",
    desc: "Sector 18, Rohini, Delhi.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2CA50D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-us" id="why-choose-us" aria-labelledby="why-us-heading">
      <div className="container why-us__inner">
        {/* Left Column: Header & 2x2 Feature Cards */}
        <div className="why-us__content reveal-left">
          <div className="why-us__badge-row">
            <span className="why-us__badge">WHY CHOOSE US</span>
            <span className="why-us__badge-line" aria-hidden="true" />
          </div>

          <h2 className="why-us__heading" id="why-us-heading">
            Why Choose JSR EV Spare Parts?
          </h2>
          <span className="why-us__heading-accent" aria-hidden="true" />

          <p className="why-us__subtitle">
            Reliable parts and practical support for your electric vehicle.
          </p>

          <div className="why-us__grid reveal-stagger">
            {features.map((item) => (
              <article key={item.id} className="why-us__card reveal-up" tabIndex="0">
                <div className="why-us__card-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <div className="why-us__card-info">
                  <h3 className="why-us__card-title">{item.title}</h3>
                  <p className="why-us__card-desc">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right Column: Workshop & Spares Image */}
        <div className="why-us__media reveal-right">
          <div className="why-us__image-wrapper">
            <img
              src="/why-choose-us-parts.png"
              alt="EV spare parts including motor, controller, throttle, and shock absorber on workbench with e-rickshaw at JSR EV SPARE PARTS"
              className="why-us__image"
              width="540"
              height="480"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
