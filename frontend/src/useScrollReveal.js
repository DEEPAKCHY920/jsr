import { useEffect } from "react";

/**
 * High-performance, zero-dependency IntersectionObserver hook for smooth scroll-reveal animations.
 *
 * - Automatically respects 'prefers-reduced-motion'
 * - Animates each element only once (triggerOnce) for optimal performance
 * - Fully safe for SSR / static prerendering
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Mark document as ready for JS animations
    document.documentElement.classList.add("js-ready");

    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll(
          ".reveal, .reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger"
        )
        .forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document
        .querySelectorAll(
          ".reveal, .reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger"
        )
        .forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const selector = ".reveal, .reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger";
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
}

