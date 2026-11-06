import { useEffect, useRef, useState } from "react";

const DESKTOP_QUERY = "(min-width: 900px)";

const navLinks = [
  { id: "home", href: "#home", label: "Home", active: true },
  { id: "about", href: "#about", label: "About Us" },
  { id: "parts-enquiry", href: "#contact", label: "Parts Enquiry" },
  { id: "contact", href: "#contact", label: "Contact" },
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
      <div className="top-strip" aria-label="Business information">
        <div className="container top-strip__inner">
          <span>E-rickshaw spare parts&nbsp;&nbsp;|&nbsp;&nbsp;Rohini, Delhi</span>
        </div>
      </div>

      <nav className="navbar" aria-label="Main navigation">
        <div className="container navbar__inner">
          <a ref={logoRef} href="#home" className="logo" aria-label="JSR EV SPARE PARTS – home">
            <span className="logo__name">JSR EV</span>
            <span className="logo__sub" aria-hidden="true">
              <span className="logo__line" />
              <span className="logo__tagline">SPARE PARTS</span>
              <span className="logo__line" />
            </span>
          </a>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`nav-link${link.active ? " nav-link--active" : ""}`}
                  aria-current={link.active ? "page" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn-enquire" aria-label="Contact JSR EV SPARE PARTS">
            Enquire Now
          </a>

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
            <svg
              className="hamburger__icon hamburger__icon--open"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
              focusable="false"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg
              className="hamburger__icon hamburger__icon--close"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
              focusable="false"
            >
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
        </div>

        <div
          ref={mobileContainerRef}
          className={`mobile-menu${mobileOpen ? " mobile-menu--open" : ""}`}
          id="mobile-menu"
          aria-label="Mobile navigation"
          hidden={!mobileOpen}
        >
          <ul className="mobile-nav">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`mobile-nav__link${link.active ? " mobile-nav__link--active" : ""}`}
                  aria-current={link.active ? "page" : undefined}
                  onClick={handleMobileLink}
                >
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
              Enquire Now
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
