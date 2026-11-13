import { useEffect, useRef, useState } from "react";

const DESKTOP_QUERY = "(min-width: 900px)";

const navLinks = [
  {
    id: "home",
    href: "/#home",
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: "services",
    href: "/#services",
    label: "Services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "about",
    href: "/#about",
    label: "About",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    id: "faq",
    href: "/#faq",
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
    href: "/#contact",
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
          <a ref={logoRef} href="/" className="logo" aria-label="JSR EV SPARE PARTS – home">
            <img
              src="/jsr-logo.png"
              alt="JSR EV Spare Parts logo"
              className="logo__img"
              width="180"
              height="60"
              decoding="async"
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
            aria-controls="mobile-side-nav"
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

        {/* ── Mobile Side Navigation Drawer & Backdrop ── */}
        <div
          className={`mobile-side-overlay${mobileOpen ? " mobile-side-overlay--open" : ""}`}
          aria-hidden={!mobileOpen}
          onClick={() => setMobileOpen(false)}
        />

        <aside
          className={`mobile-side-drawer${mobileOpen ? " mobile-side-drawer--open" : ""}`}
          id="mobile-side-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          aria-hidden={!mobileOpen}
        >
          {/* Drawer Header */}
          <div className="mobile-side-drawer__header">
            <a
              href="/"
              className="mobile-side-drawer__logo"
              aria-label="JSR EV SPARE PARTS – home"
              onClick={() => handleMobileNavClick("home")}
            >
              <img
                src="/jsr-logo.png"
                alt="JSR EV Spare Parts logo"
                width="140"
                height="46"
                decoding="async"
                className="mobile-side-drawer__logo-img"
              />
            </a>

            <button
              type="button"
              className="mobile-side-drawer__close-btn"
              aria-label="Close navigation menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="mobile-side-drawer__divider" />

          {/* Navigation Links */}
          <ul className="mobile-side-drawer__nav" role="list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="mobile-side-drawer__item">
                  <a
                    href={link.href}
                    className={`mobile-side-drawer__link${isActive ? " mobile-side-drawer__link--active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => handleMobileNavClick(link.id)}
                  >
                    <span className="mobile-side-drawer__icon">{link.icon}</span>
                    <span className="mobile-side-drawer__label">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Drawer Footer Actions */}
          <div className="mobile-side-drawer__footer">
            <a
              href="https://wa.me/919990120067?text=Hello%20JSR%20EV%20SPARE%20PARTS%2C%20I%20would%20like%20to%20enquire%20about%20spare%20parts%20or%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-side-drawer__whatsapp-btn"
              onClick={() => setMobileOpen(false)}
              aria-label="Chat on WhatsApp (opens in a new tab)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" />
              </svg>
              <span>WhatsApp Enquiry</span>
            </a>

            <a
              href="tel:+919990120067"
              className="mobile-side-drawer__call-btn"
              onClick={() => setMobileOpen(false)}
              aria-label="Call shop at +91 9990120067"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>Call +91 9990120067</span>
            </a>

            <p className="mobile-side-drawer__shop-info">
              Rohini Sector 18, Delhi • 8:00 AM – 8:00 PM
            </p>
          </div>
        </aside>
      </nav>
    </header>
  </>
);
}
