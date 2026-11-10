import { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import WhyChooseUs from "./WhyChooseUs.jsx";
import StatsStrip from "./StatsStrip.jsx";
import About from "./About.jsx";
import Founder from "./Founder.jsx";
import Services from "./Services.jsx";
import FAQ from "./FAQ.jsx";
import Contact from "./Contact.jsx";
import FloatingCTA from "./FloatingCTA.jsx";
import BackToTop from "./BackToTop.jsx";
import Footer from "./Footer.jsx";
import NotFound from "./NotFound.jsx";
import { useScrollReveal } from "./useScrollReveal.js";

/** Returns true when the current pathname is the root page. */
function isHomePath() {
  if (typeof window === "undefined") return true; // SSR: always render home
  const p = window.location.pathname;
  return p === "/" || p === "/index.html";
}

export default function App() {
  const [isHome, setIsHome] = useState(isHomePath);
  useScrollReveal();

  useEffect(() => {
    const onPop = () => setIsHome(isHomePath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (!isHome) {
    return (
      <>
        <Navbar />
        <NotFound />
        <BackToTop />
        <FloatingCTA />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main aria-label="Main content">
        <Hero />
        <WhyChooseUs />
        <StatsStrip />
        <About />
        <Founder />
        <Services />
        <FAQ />
        <Contact />
      </main>
      <BackToTop />
      <FloatingCTA />
      <Footer />
    </>
  );
}
