import { useEffect, useRef, useState } from "react";

export default function StatsStrip() {
  const containerRef = useRef(null);
  // Default to final values so SSR/prerender and no-JS have full values in HTML
  const [counts, setCounts] = useState({ parts: 300, vehicles: 800 });

  useEffect(() => {
    // If reduced-motion is requested or SSR, keep final values
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    // Set to 0 initially on client before viewport intersection triggers count-up
    setCounts({ parts: 0, vehicles: 0 });

    let hasAnimated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            observer.disconnect();

            const startTime = performance.now();
            const duration = 1200; // ~1200ms duration, ease-out

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic: 1 - (1 - t)^3
              const eased = 1 - Math.pow(1 - progress, 3);

              setCounts({
                parts: Math.round(eased * 300),
                vehicles: Math.round(eased * 800),
              });

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCounts({ parts: 300, vehicles: 800 });
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-strip" ref={containerRef} aria-label="Key business facts">
      <div className="container stats-strip__inner">
        {/* Stat 1: Established Since 2024 */}
        <div className="stats-strip__item reveal-up" aria-label="Since 2024 serving Rohini">
          <div className="stats-strip__number">
            <span className="stats-strip__highlight stats-strip__highlight--since">Since 2024</span>
          </div>
          <p className="stats-strip__label">Serving Rohini</p>
          <span className="stats-strip__sub">Sector 18, Rohini</span>
        </div>

        <div className="stats-strip__divider" aria-hidden="true" />

        {/* Stat 2: Spares */}
        <div className="stats-strip__item reveal-up" aria-label="300 plus EV spare parts">
          <div className="stats-strip__number" aria-hidden="true">
            <span className="stats-strip__val stats-strip__val--3dig">{counts.parts}</span>
            <span className="stats-strip__suffix">+</span>
          </div>
          <p className="stats-strip__label">EV Spare Parts</p>
          <span className="stats-strip__sub">Motors, controllers &amp; spares</span>
        </div>

        <div className="stats-strip__divider" aria-hidden="true" />

        {/* Stat 3: Vehicles */}
        <div className="stats-strip__item reveal-up" aria-label="800 plus vehicles repaired">
          <div className="stats-strip__number" aria-hidden="true">
            <span className="stats-strip__val stats-strip__val--3dig">{counts.vehicles}</span>
            <span className="stats-strip__suffix">+</span>
          </div>
          <p className="stats-strip__label">Vehicles Repaired</p>
          <span className="stats-strip__sub">E-rickshaws &amp; e-scooters</span>
        </div>

        <div className="stats-strip__divider" aria-hidden="true" />

        {/* Stat 4: Timing & Availability */}
        <div className="stats-strip__item reveal-up" aria-label="7 days open every day">
          <div className="stats-strip__number">
            <span className="stats-strip__highlight">7 Days</span>
          </div>
          <p className="stats-strip__label">Open Every Day</p>
          <span className="stats-strip__sub"><time>8:00 AM</time> – <time>8:00 PM</time></span>
        </div>
      </div>
    </section>
  );
}
