import { useEffect, useRef, useState } from "react";

const DESKTOP_QUERY = "(min-width: 900px)";

const navLinks = [
  {
    id: "home",
    href: "#home",
    label: "Home",
    active: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: "about",
    href: "#about",
    label: "About Us",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    id: "parts-enquiry",
    href: "#contact",
    label: "Parts Enquiry",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
      </svg>
    ),
  },
  {
    id: "contact",
    href: "#contact",
    label: "Contact",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const mobileContainerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (
        mobileOpen &&
        mobileContainerRef.current &&
        !mobileContainerRef.current.contains(event.target) &&
        !hamburgerRef.current?.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const resetForBreakpoint = (event) => {
      const activeElement = document.activeElement;
      if (event.matches && mobileContainerRef.current?.contains(activeElement)) {
        logoRef.current?.focus();
      }
      setMobileOpen(false);
    };
    mediaQuery.addEventListener("change", resetForBreakpoint);
    return () => mediaQuery.removeEventListener("change", resetForBreakpoint);
  }, []);

  const handleMobileLink = () => setMobileOpen(false);

  return (
    <header className="site-header" role="banner">
      <nav className="navbar" aria-label="Main navigation">
        <div className="container navbar__inner">

          {/* ── Logo ── */}
          <a ref={logoRef} href="#home" className="logo" aria-label="JSR EV SPARE PARTS – home">
            <div className="logo__wordmark">
              <span className="logo__jsr">JSR</span>
              <span className="logo__ev">
                {" EV"}
                {/* Lightning bolt */}
                <svg className="logo__bolt" viewBox="0 0 14 22" fill="none" aria-hidden="true">
                  <path d="M8 1L1 13h5.5L5 21l8-12H7L8 1z" fill="#65D510" stroke="#65D510" strokeWidth="0.5" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="logo__sub">
              <span className="logo__line" aria-hidden="true" />
              <span className="logo__tagline">SPARE PARTS</span>
              <span className="logo__line" aria-hidden="true" />
            </div>
          </a>

          {/* ── Desktop nav links ── */}
          <ul className="nav-links" role="list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`nav-link${link.active ? " nav-link--active" : ""}`}
                  aria-current={link.active ? "page" : undefined}
                >
                  {link.icon}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Enquire Now CTA ── */}
          <a href="#contact" className="btn-enquire" aria-label="Contact JSR EV SPARE PARTS">
            {/* paper-plane icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            Enquire Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          {/* ── Hamburger (mobile) ── */}
          <button
            ref={hamburgerRef}
            type="button"
            className={`hamburger${mobileOpen ? " hamburger--open" : ""}`}
            id="hamburger-btn"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
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

        {/* ── Mobile menu panel ── */}
        <div
          ref={mobileContainerRef}
          className={`mobile-menu${mobileOpen ? " mobile-menu--open" : ""}`}
          id="mobile-menu"
          aria-label="Mobile navigation"
          hidden={!mobileOpen}
        >
          <ul className="mobile-nav" role="list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`mobile-nav__link${link.active ? " mobile-nav__link--active" : ""}`}
                  aria-current={link.active ? "page" : undefined}
                  onClick={handleMobileLink}
                >
                  <span className="mobile-nav__icon">{link.icon}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-menu__cta">
            <a
              href="#contact"
              className="btn-enquire btn-enquire--full"
              aria-label="Contact JSR EV SPARE PARTS"
              onClick={handleMobileLink}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
              Enquire Now
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
