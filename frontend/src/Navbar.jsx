import { useEffect, useRef, useState } from "react";

const DESKTOP_QUERY = "(min-width: 900px)";

const navLinks = [
  {
    id: "home",
    href: "#home",
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: "services",
    href: "#services",
    label: "Services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "about",
    href: "#about",
    label: "About",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    id: "faq",
    href: "#faq",
    label: "FAQ",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    id: "contact",
    href: "#contact",
    label: "Contact",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

// Mobile nav items matching design mockup (Image 1)
const mobileNavLinks = [
  {
    id: "home",
    href: "#home",
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: "about",
    href: "#about",
    label: "About Us",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    id: "services",
    href: "#services",
    label: "Parts Enquiry",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "contact",
    href: "#contact",
    label: "Contact",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  const hamburgerRef = useRef(null);
  const logoRef = useRef(null);

  // Track scroll position for header shadow & scroll-progress bar
  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;

    const handleScroll = () => {
      const isPast = window.scrollY > 20;
      setScrolled((prev) => (prev !== isPast ? isPast : prev));

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
          setScrollProgress(Math.min(1, Math.max(0, progress)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section spy using IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const sectionIds = ["home", "services", "about", "faq", "contact"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Reset when resizing past mobile breakpoint
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const resetForBreakpoint = (event) => {
      if (event.matches) {
        setMobileOpen(false);
      }
    };
    mediaQuery.addEventListener("change", resetForBreakpoint);
    return () => mediaQuery.removeEventListener("change", resetForBreakpoint);
  }, []);

  const handleMobileNavClick = (id) => {
    setActiveSection(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Indicator Bar pinned directly to viewport */}
      <div
        className="scroll-progress-bar"
        style={{
          transform: `scaleX(${scrollProgress})`,
          opacity: scrollProgress > 0 ? 1 : 0,
        }}
        aria-hidden="true"
      />

      <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`} role="banner">
        <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`} aria-label="Main navigation">
        <div className="container navbar__inner">

          {/* ── Logo ── */}
          <a ref={logoRef} href="#home" className="logo" aria-label="JSR EV SPARE PARTS – home">
            <img
              src="/jsr-logo.png"
              alt="JSR EV SPARE PARTS"
              className="logo__img"
              width="180"
              height="60"
            />
          </a>

          {/* ── Desktop nav links ── */}
          <ul className="nav-links" role="list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={`nav-link${isActive ? " nav-link--active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setActiveSection(link.id)}
                  >
                    {link.icon}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── Call Now CTA (Desktop) ── */}
          <a
            href="tel:+919990120067"
            className="btn-enquire"
            aria-label="Call JSR EV SPARE PARTS at +91 9990120067"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            Call Now
          </a>

          {/* ── Hamburger Button (Mobile) ── */}
          <button
            ref={hamburgerRef}
            type="button"
            className={`hamburger${mobileOpen ? " hamburger--open" : ""}`}
            id="hamburger-btn"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-modal"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg className="hamburger__icon hamburger__icon--open" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" focusable="false">
              <line x1="3" y1="6"  x2="21" y2="6"  />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg className="hamburger__icon hamburger__icon--close" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" focusable="false">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4"  y2="20" />
            </svg>
          </button>
        </div>

        {/* ── Mobile Modal Dialog & Backdrop Overlay ── */}
        <div
          className={`mobile-menu-overlay${mobileOpen ? " mobile-menu-overlay--open" : ""}`}
          id="mobile-menu-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          aria-hidden={!mobileOpen}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="mobile-menu-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Logo & Close Button */}
            <div className="mobile-menu-card__header">
              <a
                href="#home"
                className="mobile-menu-card__logo"
                aria-label="JSR EV SPARE PARTS – home"
                onClick={() => handleMobileNavClick("home")}
              >
                <svg className="mobile-menu-card__logo-car" viewBox="0 0 150 40" fill="none" aria-hidden="true">
                  <path d="M14 28l6-10h-5l9-12-3 8h5l-7 10h5z" fill="#43A047" />
                  <path d="M26 22c10-12 32-17 56-17 26 0 46 5 56 17" stroke="#43A047" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <div className="mobile-menu-card__logo-text">
                  <div className="mobile-menu-card__logo-main">
                    <span className="mobile-menu-card__logo-brand">JSR</span>
                    <span className="mobile-menu-card__logo-ev">EV</span>
                  </div>
                  <div className="mobile-menu-card__logo-sub">
                    <span className="mobile-menu-card__logo-line" aria-hidden="true" />
                    <span className="mobile-menu-card__logo-tag">SPARE PARTS</span>
                    <span className="mobile-menu-card__logo-line" aria-hidden="true" />
                  </div>
                </div>
              </a>

              <button
                type="button"
                className="mobile-menu-card__close-btn"
                aria-label="Close navigation menu"
                onClick={() => setMobileOpen(false)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1746CE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Divider Line */}
            <div className="mobile-menu-card__divider" />

            {/* Navigation List matching Image 1 */}
            <ul className="mobile-menu-card__nav" role="list">
              {mobileNavLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id} className="mobile-menu-card__item">
                    <a
                      href={link.href}
                      className={`mobile-menu-card__link${isActive ? " mobile-menu-card__link--active" : ""}`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => handleMobileNavClick(link.id)}
                    >
                      <span className="mobile-menu-card__icon">{link.icon}</span>
                      <span className="mobile-menu-card__label">{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Bottom Action: Single Full-Width Green Enquire Now Button matching Image 1 */}
            <div className="mobile-menu-card__actions">
              <a
                href="https://wa.me/919990120067?text=Hello%20JSR%20EV%20SPARE%20PARTS%2C%20I%20would%20like%20to%20enquire%20about%20spare%20parts%20or%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-menu-card__enquire-btn"
                onClick={() => setMobileOpen(false)}
                aria-label="Enquire Now on WhatsApp"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Enquire Now</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </>
);
}
