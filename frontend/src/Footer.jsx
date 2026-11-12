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
    id: "genuine",
    label: "Genuine Parts",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#65C91A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: "repair",
    label: "Repair & Fitting",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#65C91A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "fast",
    label: "Fast Service",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#65C91A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 17h4V5H2v12h3" />
        <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" />
        <circle cx="7.5" cy="17.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: "trusted",
    label: "Trusted Shop",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#65C91A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

const socialLinks = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/jsrevspareparts",
    ariaLabel: "JSR EV Spare Parts on Facebook (opens in a new tab)",
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
    ariaLabel: "JSR EV Spare Parts on Instagram (opens in a new tab)",
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
    label: "Find us on Google",
    href: GOOGLE_PROFILE_URL,
    ariaLabel: "Find JSR EV Spare Parts on Google (opens in a new tab)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/919990120067",
    ariaLabel: "Chat with JSR EV Spare Parts on WhatsApp (opens in a new tab)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" />
      </svg>
    ),
  },
];

function FooterHeading({ title, isOpen, onToggle, isCollapsible = false }) {
  return (
    <div
      className={`site-footer__heading-group ${isCollapsible ? "site-footer__heading-group--collapsible" : ""}`}
      onClick={isCollapsible ? onToggle : undefined}
      role={isCollapsible ? "button" : undefined}
      tabIndex={isCollapsible ? 0 : undefined}
      aria-expanded={isCollapsible ? isOpen : undefined}
      onKeyDown={isCollapsible ? (e) => (e.key === "Enter" || e.key === " ") && onToggle() : undefined}
    >
      <div className="site-footer__heading-title-wrap">
        <h3 className="site-footer__heading">{title}</h3>
        <span className="site-footer__heading-bar" aria-hidden="true" />
      </div>
      {isCollapsible && (
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
      )}
    </div>
  );
}

export default function Footer() {
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <footer className="site-footer" role="contentinfo">
      {/* Subtle E-Rickshaw photograph background on desktop right */}
      <div className="site-footer__bg-vehicle" aria-hidden="true" />

      <div className="container site-footer__inner">
        <div className="site-footer__grid reveal-stagger">
          {/* Column 1 – Brand Information */}
          <div className="site-footer__col site-footer__col--brand reveal-up">
            <a className="site-footer__logo" href="/" aria-label="JSR EV SPARE PARTS — back to home">
              <img
                src="/jsr-logo-footer.png"
                alt="JSR EV Spare Parts logo"
                className="site-footer__logo-img"
                width="160"
                height="100"
                loading="lazy"
                decoding="async"
              />
            </a>

            <p className="site-footer__description">
              Genuine spare parts, maintenance and installation services for e-rickshaws and electric scooters in Rohini, Delhi.
            </p>

            {/* Service highlight cards */}
            <div className="site-footer__highlights" role="list">
              {serviceHighlights.map((item) => (
                <div className="site-footer__highlight-item" key={item.id} role="listitem">
                  <span className="site-footer__highlight-icon">{item.icon}</span>
                  <span className="site-footer__highlight-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Separator (Desktop) */}
          <div className="site-footer__divider-col" aria-hidden="true" />

          {/* Column 2 – Quick Links */}
          <div className="site-footer__col site-footer__col--links reveal-up">
            <FooterHeading
              title="Quick Links"
              isOpen={quickLinksOpen}
              onToggle={() => setQuickLinksOpen(!quickLinksOpen)}
              isCollapsible={true}
            />
            <div className={`site-footer__collapse-content ${quickLinksOpen ? "site-footer__collapse-content--open" : ""}`}>
              <div className="site-footer__collapse-inner">
                <ul className="site-footer__links" role="list">
                  {quickLinks.map((link) => (
                    <li key={link.id}>
                      <a href={link.href} className="site-footer__link">
                        <svg className="site-footer__link-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span>{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Vertical Separator (Desktop) */}
          <div className="site-footer__divider-col" aria-hidden="true" />

          {/* Column 3 – Contact & Timings */}
          <div className="site-footer__col site-footer__col--contact reveal-up">
            <FooterHeading
              title="Contact & Timings"
              isOpen={contactOpen}
              onToggle={() => setContactOpen(!contactOpen)}
              isCollapsible={true}
            />
            <div className={`site-footer__collapse-content ${contactOpen ? "site-footer__collapse-content--open" : ""}`}>
              <div className="site-footer__collapse-inner">
                <address className="site-footer__contact-list">
                  {/* Phone */}
                  <div className="site-footer__contact-row">
                    <span className="site-footer__icon-badge site-footer__icon-badge--blue" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </span>
                    <a href="tel:+919990120067" className="site-footer__contact-link">+91 9990120067</a>
                  </div>

                  {/* WhatsApp */}
                  <div className="site-footer__contact-row">
                    <span className="site-footer__icon-badge site-footer__icon-badge--green" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" />
                      </svg>
                    </span>
                    <a href="https://wa.me/919990120067" target="_blank" rel="noopener noreferrer" className="site-footer__contact-link" aria-label="Chat with JSR EV Spare Parts on WhatsApp at +91 9990120067 (opens in a new tab)">+91 9990120067</a>
                  </div>

                  {/* Email */}
                  <div className="site-footer__contact-row">
                    <span className="site-footer__icon-badge site-footer__icon-badge--green" aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>
                    <a href="mailto:admin@jsrevtech.in" className="site-footer__contact-link site-footer__contact-link--email">admin@jsrevtech.in</a>
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
                      aria-label="Open JSR EV Spare Parts address in Google Maps (opens in a new tab)"
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

          {/* Column 4 – Follow Us */}
          <div className="site-footer__col site-footer__col--social reveal-up">
            <FooterHeading title="Follow Us" />
            <div className="site-footer__social-wrap">
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
              <img
                src="/footer-mobile-rickshaw.png"
                alt="JSR electric rickshaw illustration"
                className="site-footer__social-rickshaw"
                loading="lazy"
                width="360"
                height="285"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="site-footer__bottom reveal-up">
          <p className="site-footer__tagline-hi" lang="hi">
            ई-रिक्शा और इलेक्ट्रिक स्कूटर स्पेयर पार्ट्स – सेक्टर 18, रोहिणी, दिल्ली
          </p>

          <p className="site-footer__copyright">
            © 2026 JSR EV Spare Parts. All rights reserved.
          </p>

          <div className="site-footer__legal-links">
            <a href="/privacy" className="site-footer__legal-link">Privacy Policy</a>
            <span className="site-footer__legal-divider" aria-hidden="true">|</span>
            <a href="/terms" className="site-footer__legal-link">Terms &amp; Conditions</a>
            <span className="site-footer__legal-divider" aria-hidden="true">|</span>
            <a href="/refund" className="site-footer__legal-link">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
