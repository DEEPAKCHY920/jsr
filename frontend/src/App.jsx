import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Founder from "./Founder.jsx";
import Services from "./Services.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main aria-label="Main content">
        <Hero />
        <About />
        <Founder />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
