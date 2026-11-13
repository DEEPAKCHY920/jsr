import { useState } from "react";
import { GOOGLE_PROFILE_URL } from "./config/reviews.js";

const quickLinks = [
  { id: "home", href: "/#home", label: "Home" },
  { id: "services", href: "/#services", label: "Our Services" },
  { id: "why-us", href: "/#why-choose-us", label: "Why Choose Us" },
  { id: "about", href: "/#about", label: "About Our Shop" },
  { id: "reviews", href: "/#reviews", label: "Customer Reviews" },
  { id: "faq", href: "/#faq", label: "FAQ" },
  { id: "contact", href: "/#contact", label: "Contact" },
];

const serviceHighlights = [
  {
    id: "erickshaw",
    lines: ["E-Rickshaw", "Parts"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39D000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 17h2v-3.34a4 4 0 0 0-1.17-2.83L17 8h-4v9h2" />
        <path d="M5 17H3v-5l2-4h6v9H7" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    id: "scooter",
    lines: ["Scooter", "Parts"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39D000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 18h6" />
        <path d="M12 9v9" />
        <path d="m14 5-2 4-2-4" />
        <path d="M8 5h8" />
      </svg>
    ),
  },
  {
    id: "repair",
    lines: ["Repair &", "Fitting"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39D000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "wholesale",
    lines: ["Wholesale", "& Retail"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39D000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
];

const socialLinks = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/jsrevspareparts",
    ariaLabel: "JSR EV Spare Parts on Facebook",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/jsrevspareparts",
    ariaLabel: "JSR EV Spare Parts on Instagram",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    id: "google",
    label: "Google",
    href: GOOGLE_PROFILE_URL,
    ariaLabel: "JSR EV Spare Parts on Google",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/919990120067?text=Hi%2C%20I%20need%20an%20e-rickshaw%20spare%20part",
    ariaLabel: "JSR EV Spare Parts on WhatsApp",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" />
      </svg>
    ),
  },
];

function FooterHeading({ title, isAccordion, isOpen, onToggle, panelId }) {
  return (
    <div className="site-footer__heading-group">
      {isAccordion ? (
        <button
          type="button"
          className="site-footer__heading-btn"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <div className="site-footer__heading-title-wrap">
            <h3 className="site-footer__heading">{title}</h3>
            <span className="site-footer__heading-bar" aria-hidden="true" />
          </div>
          <svg
            className={`site-footer__chevron ${isOpen ? "site-footer__chevron--open" : ""}`}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      ) : (
        <div className="site-footer__heading-title-wrap">
          <h3 className="site-footer__heading">{title}</h3>
          <span className="site-footer__heading-bar" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

export default function Footer() {
  const [openAccordions, setOpenAccordions] = useState({
    links: false,
    contact: true,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <footer className="site-footer" role="contentinfo">
      {/* 1. Subtle E-Rickshaw Silhouette Background */}
      <div className="site-footer__bg-vehicle" aria-hidden="true" />

      {/* 2. Premium Oversized Background Typography & Decorative Curved Green Strokes */}
      <div className="site-footer__bg-typography" aria-hidden="true">
        <div className="site-footer__bg-text">
          <span className="site-footer__bg-text-desktop">JSR EV SPARE PARTS</span>
          <span className="site-footer__bg-text-mobile">
            <span>JSR EV</span>
            <span>SPARE PARTS</span>
          </span>
        </div>
        <svg
          className="site-footer__bg-curves"
          viewBox="0 0 1440 280"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="footerSwooshLeft" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#39D000" stopOpacity="0" />
              <stop offset="35%" stopColor="#39D000" stopOpacity="0.9" />
              <stop offset="85%" stopColor="#39D000" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#39D000" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="footerSwooshRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#39D000" stopOpacity="0" />
              <stop offset="45%" stopColor="#39D000" stopOpacity="0.9" />
              <stop offset="90%" stopColor="#39D000" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#39D000" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M -40 220 C 140 185, 310 245, 520 180"
            stroke="url(#footerSwooshLeft)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 920 115 C 1110 65, 1280 155, 1480 120"
            stroke="url(#footerSwooshRight)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 3. Dark Navy Vignette / Overlay */}
      <div className="site-footer__overlay" aria-hidden="true" />

      <h2 className="sr-only">Footer Information</h2>

      <div className="container site-footer__inner">
        <div className="site-footer__grid reveal-stagger">
          {/* Column 1 – Brand Information */}
          <div className="site-footer__col site-footer__col--brand reveal-up">
            <a className="site-footer__logo" href="/" aria-label="JSR EV SPARE PARTS — back to home">
              <img
                src="/jsr-logo-footer.png"
                alt="JSR EV Spare Parts logo"
                className="site-footer__logo-img"
                width="168"
                height="56"
                loading="lazy"
                decoding="async"
              />
            </a>

            <p className="site-footer__description">
              Spare parts, repair and fitting services for e-rickshaws and electric scooters in Sector 18, Rohini, Delhi.
            </p>

            {/* 4 Service Cards in a single row */}
            <div className="site-footer__services-grid" role="list" aria-label="Our core offerings">
              {serviceHighlights.map((service) => (
                <div key={service.id} className="site-footer__service-card" role="listitem">
                  <div className="site-footer__service-icon" aria-hidden="true">
                    {service.icon}
                  </div>
                  <span className="site-footer__service-label">
                    {service.lines.map((line, i) => (
                      <span key={i} className="site-footer__service-line">{line}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Unified Accordion Card on Mobile; Normal Columns on Desktop */}
          <div className="site-footer__accordion-card">
            {/* Column 2 – Quick Links */}
            <div className="site-footer__col site-footer__col--links site-footer__accordion-section reveal-up">
              <FooterHeading
                title="Quick Links"
                isAccordion={true}
                isOpen={openAccordions.links}
                onToggle={() => toggleAccordion("links")}
                panelId="footer-panel-links"
              />
              <div
                id="footer-panel-links"
                className={`site-footer__accordion-content ${
                  openAccordions.links ? "site-footer__accordion-content--open" : ""
                }`}
              >
                <nav className="site-footer__links-nav" aria-label="Quick Links">
                  <ul className="site-footer__links-list">
                    {quickLinks.map((link) => (
                      <li key={link.id} className="site-footer__link-item">
                        <a href={link.href} className="site-footer__link">
                          <span className="site-footer__link-arrow" aria-hidden="true">&rsaquo;</span>
                          <span className="site-footer__link-text">{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="site-footer__accordion-divider" aria-hidden="true" />

            {/* Column 3 – Contact & Timings */}
            <div className="site-footer__col site-footer__col--contact site-footer__accordion-section reveal-up">
              <FooterHeading
                title="Contact &amp; Timings"
                isAccordion={true}
                isOpen={openAccordions.contact}
                onToggle={() => toggleAccordion("contact")}
                panelId="footer-panel-contact"
              />
              <div
                id="footer-panel-contact"
                className={`site-footer__accordion-content ${
                  openAccordions.contact ? "site-footer__accordion-content--open" : ""
                }`}
              >
                <address className="site-footer__contact-info">
                  {/* Phone */}
                  <div className="site-footer__contact-row">
                    <span className="site-footer__icon-badge site-footer__icon-badge--blue" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </span>
                    <a href="tel:+919990120067" className="site-footer__contact-link site-footer__contact-link--tel">
                      Call: +91 9990120067
                    </a>
                  </div>

                  {/* WhatsApp */}
                  <div className="site-footer__contact-row">
                    <span className="site-footer__icon-badge site-footer__icon-badge--green" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" />
                      </svg>
                    </span>
                    <a
                      href="https://wa.me/919990120067?text=Hi%2C%20I%20need%20an%20e-rickshaw%20spare%20part"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="site-footer__contact-link site-footer__contact-link--whatsapp"
                      aria-label="Chat with JSR EV Spare Parts on WhatsApp"
                    >
                      WhatsApp: +91 9990120067
                    </a>
                  </div>

                  {/* Email */}
                  <div className="site-footer__contact-row">
                    <span className="site-footer__icon-badge site-footer__icon-badge--blue" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>
                    <a href="mailto:admin@jsrevtech.in" className="site-footer__contact-link site-footer__contact-link--email">
                      admin@jsrevtech.in
                    </a>
                  </div>

                  {/* Address */}
                  <div className="site-footer__contact-row">
                    <span className="site-footer__icon-badge site-footer__icon-badge--blue" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <a
                      href="https://maps.google.com/?q=Sector+18+Rohini+Delhi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="site-footer__contact-text site-footer__contact-link"
                      aria-label="Open JSR EV Spare Parts address in Google Maps"
                    >
                      Sector 18, Near Data Ram Apartment<br />
                      <span className="site-footer__text-muted">Rohini, Delhi – 110089</span>
                    </a>
                  </div>

                  {/* Timings */}
                  <div className="site-footer__contact-row">
                    <span className="site-footer__icon-badge site-footer__icon-badge--blue" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>
                    <div className="site-footer__contact-text">
                      <span>8:00 AM – 8:00 PM</span><br />
                      <span className="site-footer__text-accent">Open every day</span>
                    </div>
                  </div>
                </address>
              </div>
            </div>
          </div>

          {/* Column 4 – Follow Us inside its own rounded card on mobile */}
          <div className="site-footer__col site-footer__col--social site-footer__social-card reveal-up">
            <FooterHeading title="Follow Us" isAccordion={false} />
            <nav className="site-footer__social-wrap" aria-label="Follow Us">
              <div className="site-footer__social-row">
                {socialLinks.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="site-footer__social-btn"
                    aria-label={item.ariaLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Dedicated Desktop/Tablet Brand Wordmark Band (Unobstructed, no text overlaps) */}
        <div className="site-footer__wordmark-band reveal-up" aria-hidden="true">
          <div className="site-footer__wordmark-text">
            JSR EV SPARE PARTS
          </div>
          <svg
            className="site-footer__wordmark-curves"
            viewBox="0 0 1440 160"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="wordmarkSwooshLeft" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#39D000" stopOpacity="0" />
                <stop offset="35%" stopColor="#39D000" stopOpacity="0.9" />
                <stop offset="85%" stopColor="#39D000" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#39D000" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="wordmarkSwooshRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#39D000" stopOpacity="0" />
                <stop offset="45%" stopColor="#39D000" stopOpacity="0.9" />
                <stop offset="90%" stopColor="#39D000" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#39D000" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M -40 120 C 160 95, 310 140, 520 90"
              stroke="url(#wordmarkSwooshLeft)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 920 65 C 1110 25, 1270 95, 1480 70"
              stroke="url(#wordmarkSwooshRight)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Bottom Bar: Horizontal Divider, Hindi Tagline, Copyright & Legal Links */}
        <div className="site-footer__bottom reveal-up">
          <div className="site-footer__tagline-row">
            <p className="site-footer__tagline-hi" lang="hi">
              ई-रिक्शा और इलेक्ट्रिक स्कूटर स्पेयर पार्ट्स – सेक्टर 18, रोहिणी, दिल्ली
            </p>
          </div>

          <div className="site-footer__bottom-row">
            <p className="site-footer__copyright">
              © 2026 JSR EV Spare Parts. All rights reserved.
            </p>

            <nav className="site-footer__legal-links" aria-label="Legal links">
              <a href="/privacy" className="site-footer__legal-link">Privacy Policy</a>
              <span className="site-footer__legal-divider" aria-hidden="true">|</span>
              <a href="/terms" className="site-footer__legal-link">Terms &amp; Conditions</a>
              <span className="site-footer__legal-divider" aria-hidden="true">|</span>
              <a href="/refund" className="site-footer__legal-link">Refund Policy</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
