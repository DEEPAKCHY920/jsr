const quickLinks = [
  { id: "home", href: "#home", label: "Home" },
  { id: "about", href: "#about", label: "About Our Shop" },
  { id: "services", href: "#services", label: "Our Services" },
  { id: "contact", href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__columns">
          <div className="site-footer__shop">
            <a className="site-footer__logo" href="#home" aria-label="JSR EV SPARE PARTS — back to home">
              <span>JSR EV</span>
              <span>SPARE PARTS</span>
            </a>
            <span className="site-footer__shop-accent" aria-hidden="true" />
            <p className="site-footer__description">Spare parts, repair and fitting services for e-rickshaws and electric scooters in Sector 18, Rohini, Delhi.</p>
          </div>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            <h2 className="site-footer__heading">Quick Links</h2>
            <span className="site-footer__heading-accent" aria-hidden="true" />
            <ul className="site-footer__links" role="list">
              {quickLinks.map((link) => (
                <li key={link.id}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__contact">
            <h2 className="site-footer__heading">Contact &amp; Timings</h2>
            <span className="site-footer__heading-accent" aria-hidden="true" />
            <address className="site-footer__address">
              <div className="site-footer__contact-row">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                  <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 3c-4-1.5-7.5-5-9-9l3-2-2-4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <a href="tel:+919990120067">+91 9990120067</a>
              </div>
              <div className="site-footer__contact-row">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                  <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M9 8.5c.8 2.5 2 3.7 4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <a href="https://wa.me/919990120067" target="_blank" rel="noopener noreferrer">+91 9990120067</a>
              </div>
              <div className="site-footer__contact-row">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
                </svg>
                <p>Sector 18, Rohini, Delhi – 110089<br />Near Data Ram Apartment</p>
              </div>
              <div className="site-footer__contact-row">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p>8:00 AM – 8:00 PM<br />Open every day</p>
              </div>
            </address>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© 2026 JSR EV SPARE PARTS. All rights reserved.</p>
          <a className="site-footer__top-link" href="#home">
            Back to top
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
