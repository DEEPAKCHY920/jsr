export default function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div className="container contact__inner">
        <header className="contact__header reveal-up">
          <h2 className="contact__heading" id="contact-heading">Visit or Contact Our Shop</h2>
          <p className="contact__subtitle">Contact us for spare parts, repair and fitting enquiries.</p>
        </header>

        <div className="contact__layout">
          <div className="contact__details">
            <div className="contact__shop-card reveal-left">
              <p className="contact__shop-name">JSR EV SPARE PARTS</p>

              <address className="contact__address">
                <div className="contact__detail">
                  <span className="contact__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" focusable="false">
                      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  <div>
                    <span className="contact__detail-label">Address</span>
                    <p>Sector 18, Rohini, Delhi – 110089</p>
                    <p className="contact__muted">Near Data Ram Apartment</p>
                  </div>
                </div>
              </address>

              <div className="contact__detail">
                <span className="contact__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" focusable="false">
                    <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 3c-4-1.5-7.5-5-9-9l3-2-2-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <span className="contact__detail-label">Phone &amp; WhatsApp</span>
                  <p><a href="tel:+919990120067">+91 9990120067</a></p>
                </div>
              </div>

              <div className="contact__detail">
                <span className="contact__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" focusable="false">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <span className="contact__detail-label">Opening Hours</span>
                  <p>8:00 AM – 8:00 PM</p>
                  <p className="contact__muted">Open every day</p>
                </div>
              </div>

              <div className="contact__actions">
                <a className="contact__button contact__button--primary" href="tel:+919990120067">Call Now</a>
                <a className="contact__button contact__button--secondary" href="https://wa.me/919990120067?text=Hello%20JSR%20EV%20SPARE%20PARTS%2C%20I%20would%20like%20to%20enquire%20about%20spare%20parts%20or%20services." target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>

          <div className="contact__map-card reveal-right">
            <iframe
              className="contact__map"
              src="https://maps.google.com/maps?q=Sector%2018%20Rohini%20Delhi&output=embed"
              title="Approximate area map of Sector 18, Rohini, Delhi"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="contact__map-info">
              <p>Area map only. Please call us for the exact shop location.</p>
              <a className="contact__maps-link" href="https://www.google.com/maps/search/?api=1&query=Sector%2018%20Rohini%20Delhi" target="_blank" rel="noopener noreferrer">View Area on Maps</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
