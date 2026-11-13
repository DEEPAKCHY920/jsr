import "./StoreLocation.css";
import { GOOGLE_REVIEW_URL } from "./config/reviews.js";

export default function StoreLocation() {
  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=JSR+EV+SPARE+PARTS&destination_place_id=ChIJ531MOEEB3TkRIZ4aIUZvT4g";
  const mapsSearchUrl =
    "https://www.google.com/maps/search/?api=1&query=JSR+EV+SPARE+PARTS+Rohini+Sector+18+Delhi";

  return (
    <section
      className="store-location"
      id="contact"
      aria-labelledby="store-location-heading"
    >
      <div className="container store-location__inner">
        {/* Section Header */}
        <header className="store-location__header reveal-up">
          <div className="store-location__eyebrow-row">
            <span className="store-location__eyebrow">FIND OUR STORE</span>
            <span className="store-location__eyebrow-line" aria-hidden="true" />
          </div>
          <h2 className="store-location__heading" id="store-location-heading">
            Visit Our Store in Sector 18, Rohini
          </h2>
          <p className="store-location__subtitle">
            Find genuine e-rickshaw spare parts and get fast repair and fitting support in Rohini, Delhi.
          </p>
        </header>

        {/* Two-Column Responsive Layout */}
        <div className="store-location__layout">
          {/* Store Details Card */}
          <div className="store-location__card reveal-left">
            <div className="store-location__brand-meta">
              <div className="store-location__badge-row">
                <span className="store-location__badge">
                  <span className="store-location__badge-pulse" aria-hidden="true" />
                  Store Open
                </span>
                <span className="store-location__badge">Sector 18 Rohini</span>
              </div>
              <h3 className="store-location__name">JSR EV SPARE PARTS</h3>
              <p className="store-location__business-type">
                E-Rickshaw &amp; EV Spare Parts
              </p>
            </div>

            {/* Information List */}
            <ul className="store-location__info-list">
              {/* Location */}
              <li className="store-location__info-item">
                <span className="store-location__info-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div className="store-location__info-content">
                  <span className="store-location__info-label">Location</span>
                  <p className="store-location__info-value">Rohini Sector 18, Delhi, India</p>
                  <p className="store-location__info-sub">Sector 18, Near Data Ram Apartment, Rohini – 110089</p>
                </div>
              </li>

              {/* Phone */}
              <li className="store-location__info-item">
                <span className="store-location__info-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div className="store-location__info-content">
                  <span className="store-location__info-label">Phone</span>
                  <p className="store-location__info-value">
                    <a href="tel:9990120067" className="store-location__phone-link" aria-label="Call JSR EV SPARE PARTS at 9990120067">
                      +91 9990120067
                    </a>
                  </p>
                  <p className="store-location__info-sub">Call for instant spare parts availability &amp; prices</p>
                </div>
              </li>

              {/* Timings */}
              <li className="store-location__info-item">
                <span className="store-location__info-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <div className="store-location__info-content">
                  <span className="store-location__info-label">Store Hours</span>
                  <p className="store-location__info-value">8:00 AM – 8:00 PM</p>
                  <p className="store-location__info-sub store-location__highlight-open">Open every day (Monday to Sunday)</p>
                </div>
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="store-location__actions">
              {/* 1. Prominent "Get Directions" Button */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="store-location__btn store-location__btn--directions"
                aria-label="Get directions to JSR EV SPARE PARTS on Google Maps (opens in new tab)"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                <span>Get Directions</span>
              </a>

              {/* 2. Clickable Phone Call Button */}
              <a
                href="tel:9990120067"
                className="store-location__btn store-location__btn--call"
                aria-label="Call 9990120067"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call Now</span>
              </a>

              {/* 3. WhatsApp Button */}
              <a
                href="https://wa.me/919990120067?text=Hi%20JSR%20EV%20SPARE%20PARTS%2C%20I%20am%20looking%20for%20e-rickshaw%20parts%20and%20would%20like%20directions%20to%20your%20shop."
                target="_blank"
                rel="noopener noreferrer"
                className="store-location__btn store-location__btn--whatsapp"
                aria-label="Message JSR EV SPARE PARTS on WhatsApp (opens in new tab)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* 4. Google Review Button */}
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="store-location__btn store-location__btn--review"
                aria-label="Leave a Google review for JSR EV SPARE PARTS (opens in new tab)"
              >
                <span className="store-location__review-stars" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </span>
                <span>Leave a Google Review</span>
              </a>
            </div>
          </div>

          {/* Google Maps Container Card */}
          <div className="store-location__map-container reveal-right">
            {/* Top Floating Badge */}
            <div className="store-location__map-floating-chip" aria-hidden="true">
              <span className="store-location__chip-dot" />
              <span>JSR EV SPARE PARTS • Rohini</span>
            </div>

            {/* Responsive Iframe Frame */}
            <div className="store-location__map-frame-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.3269826598416!2d77.1343859!3d28.739652799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d01c1384c7de7%3A0x884f6f46221a9e21!2sJSR%20EV%20SPARE%20PARTS!5e0!3m2!1sen!2sin!4v1794570154140!5m2!1sen!2sin"
                title="Google Maps location of JSR EV SPARE PARTS in Rohini Sector 18"
                className="store-location__iframe"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* Bottom Bar with Quick Links */}
            <div className="store-location__map-bar">
              <div className="store-location__map-bar-text">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="store-location__map-bar-icon" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Near Data Ram Apartment, Sector 18, Rohini, Delhi</span>
              </div>
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="store-location__map-bar-link"
                aria-label="Open shop location in Google Maps (opens in new tab)"
              >
                <span>View Full Map</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

