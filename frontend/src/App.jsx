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
import ProductCategory from "./ProductCategory.jsx";
import { getProductBySlug } from "./data/products.js";
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

  // Synchronize document.title and meta description on client-side route changes
  useEffect(() => {
    if (typeof document === "undefined") return;

    const titles = {
      "/": "E-Rickshaw Spare Parts in Rohini, Delhi | JSR EV SPARE PARTS",
      "/privacy": "Privacy Policy | JSR EV SPARE PARTS – Rohini, Delhi",
      "/terms": "Terms & Conditions | JSR EV SPARE PARTS – Rohini, Delhi",
      "/refund": "Refund & Return Policy | JSR EV SPARE PARTS – Rohini, Delhi",
      "/404": "404 – Page Not Found | JSR EV SPARE PARTS"
    };

    const descriptions = {
      "/": "Looking for genuine e-rickshaw spare parts in Rohini, Delhi? Visit JSR EV SPARE PARTS for motors, controllers, brakes, batteries and accessories. Call 9990120067.",
      "/privacy": "Privacy policy for JSR EV Spare Parts in Sector 18, Rohini, Delhi. Explains how customer enquiries, orders, and contact details are handled securely.",
      "/terms": "Terms and conditions of sale, component compatibility checks, and in-shop repair services for JSR EV Spare Parts in Rohini, Delhi.",
      "/refund": "Return, exchange, and refund guidelines for electrical and mechanical e-rickshaw spare parts at JSR EV Spare Parts in Rohini, Delhi.",
      "/404": "The page you are looking for does not exist. Browse genuine e-rickshaw spare parts and repair services at JSR EV Spare Parts in Rohini, Delhi."
    };

    const isProd = currentPath.startsWith("/products/");
    const slug = isProd ? currentPath.replace("/products/", "").replace(/\.html$/, "") : null;
    const prod = slug ? getProductBySlug(slug) : null;

    if (prod) {
      document.title = prod.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", prod.description);
      }
      return;
    }

    const cleanPath = currentPath === "/index.html" ? "/" : currentPath.replace(/\.html$/, "");
    if (titles[cleanPath]) {
      document.title = titles[cleanPath];
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && descriptions[cleanPath]) {
      metaDesc.setAttribute("content", descriptions[cleanPath]);
    }
  }, [currentPath]);

  // Determine which page view to render
  const isHome = currentPath === "/" || currentPath === "/index.html";
  const isPrivacy = currentPath === "/privacy" || currentPath === "/privacy.html";
  const isTerms = currentPath === "/terms" || currentPath === "/terms.html";
  const isRefund = currentPath === "/refund" || currentPath === "/refund.html";
  const isProductRoute = currentPath.startsWith("/products/");
  const productSlug = isProductRoute ? currentPath.replace("/products/", "").replace(/\.html$/, "") : null;
  const product = productSlug ? getProductBySlug(productSlug) : null;

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
  } else if (isProductRoute && product) {
    mainContent = <ProductCategory product={product} />;
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
