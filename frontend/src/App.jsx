import { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Services from "./Services.jsx";
import WhyChooseUs from "./WhyChooseUs.jsx";
import StatsStrip from "./StatsStrip.jsx";
import About from "./About.jsx";
import Reviews from "./Reviews.jsx";
import FAQ from "./FAQ.jsx";
import StoreLocation from "./StoreLocation.jsx";
import FloatingCTA from "./FloatingCTA.jsx";
import BackToTop from "./BackToTop.jsx";
import Footer from "./Footer.jsx";
import NotFound from "./NotFound.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import Terms from "./Terms.jsx";
import RefundPolicy from "./RefundPolicy.jsx";
import { useScrollReveal } from "./useScrollReveal.js";

/** Resolves current pathname cleanly. */
function getPath(url) {
  if (url) return url.replace(/\/$/, "") || "/";
  if (typeof window === "undefined") return "/";
  return window.location.pathname.replace(/\/$/, "") || "/";
}

export default function App({ url }) {
  const [currentPath, setCurrentPath] = useState(() => getPath(url));
  useScrollReveal();

  useEffect(() => {
    const onPop = () => setCurrentPath(getPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Determine which page view to render
  const isHome = currentPath === "/" || currentPath === "/index.html";
  const isPrivacy = currentPath === "/privacy" || currentPath === "/privacy.html";
  const isTerms = currentPath === "/terms" || currentPath === "/terms.html";
  const isRefund = currentPath === "/refund" || currentPath === "/refund.html";

  let mainContent;
  if (isHome) {
    mainContent = (
      <main aria-label="Main content">
        <Hero />
        <Services />
        <WhyChooseUs />
        <StatsStrip />
        <About />
        <Reviews />
        <FAQ />
        <StoreLocation />
      </main>
    );
  } else if (isPrivacy) {
    mainContent = <PrivacyPolicy />;
  } else if (isTerms) {
    mainContent = <Terms />;
  } else if (isRefund) {
    mainContent = <RefundPolicy />;
  } else {
    mainContent = <NotFound />;
  }

  return (
    <>
      <Navbar />
      {mainContent}
      <BackToTop />
      <FloatingCTA />
      <Footer />
    </>
  );
}
