import { useState } from "react";

export const faqItems = [
  {
    id: "location",
    question: "Where is JSR EV Spare Parts located in Rohini?",
    answer:
      "Our physical shop is located in Sector 18, Rohini, Delhi – 110089 (near Data Ram Apartment). You can visit our store directly for spare parts purchase, repair advice, and fitting services.",
  },
  {
    id: "parts-range",
    question: "Which electric vehicle spare parts do you sell?",
    answer:
      "We stock spare parts for e-rickshaws and electric scooters, including motors, controllers, battery chargers, differentials, brake shoes, shockers, tyres, wiring kits, DC converters, headlights, tail lights, and accelerators.",
  },
  {
    id: "repair-fitting",
    question: "Do you provide repair and fitting services at the shop?",
    answer:
      "Yes. In addition to spare parts sales, we provide repairs and parts fitting at our Sector 18 shop as well as visits to your location.",
  },
  {
    id: "hours",
    question: "What are your shop timings?",
    answer:
      "Our shop is open every day from 8:00 AM to 8:00 PM, serving customers across Rohini, Badli, and North Delhi.",
  },
  {
    id: "availability",
    question: "How can I check if a spare part is currently in stock?",
    answer:
      "You can call us directly at +91 9990120067 or send a WhatsApp message with the name or photo of the part you need for an immediate availability check and price quote.",
  },
  {
    id: "buy-rohini",
    question: "Where can I buy e-rickshaw spare parts in Rohini?",
    answer:
      "You can buy parts directly at our Sector 18 shop, available at both retail and wholesale prices. Call or WhatsApp us on +91 9990120067 for wholesale rates.",
  },
  {
    id: "scooter-parts",
    question: "Which electric scooter parts do you stock?",
    answer:
      "For electric scooters, we stock controllers, battery chargers, lights, and accelerators.",
  },
  {
    id: "motor-repair",
    question: "Do you offer e-rickshaw motor repair in Delhi?",
    answer:
      "Yes, we handle motor repair along with complete servicing and parts fitting for electric rickshaws.",
  },
  {
    id: "battery-packs",
    question: "Do you supply complete battery packs and chargers?",
    answer:
      "Yes, we supply complete battery packs as well as e-rickshaw battery chargers.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState("location");

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq" id="faq" aria-labelledby="faq-heading">
      <div className="container faq__inner">
        <header className="faq__header reveal-up">
          <div className="faq__badge-row">
            <span className="faq__badge">FREQUENTLY ASKED QUESTIONS</span>
            <span className="faq__badge-line" aria-hidden="true" />
          </div>
          <h2 className="faq__heading" id="faq-heading">
            Got Questions About EV Spare Parts?
          </h2>
          <span className="faq__heading-accent" aria-hidden="true" />
          <p className="faq__subtitle">
            Reliable information on spare parts, shop location, timings, and fitting services in Rohini, Delhi.
          </p>
        </header>

        <div className="faq__list reveal-up">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            const headingId = `faq-h-${item.id}`;
            const panelId = `faq-p-${item.id}`;

            return (
              <div
                key={item.id}
                className={`faq__item ${isOpen ? "faq__item--open" : ""}`}
              >
                <h3>
                  <button
                    type="button"
                    className="faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    id={headingId}
                    onClick={() => toggleItem(item.id)}
                  >
                    <span className="faq__question-text">{item.question}</span>
                    <span className="faq__icon" aria-hidden="true">
                      <svg
                        className="faq__chevron"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        focusable="false"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  className={`faq__panel ${isOpen ? "faq__panel--open" : ""}`}
                >
                  <div className="faq__panel-inner">
                    {item.id === "buy-rohini" ? (
                      <p className="faq__answer">
                        You can buy parts directly at our Sector 18 shop, available at both retail and wholesale prices.{" "}
                        <a href="tel:+919990120067" className="faq__link">Call</a> or{" "}
                        <a
                          href="https://wa.me/919990120067?text=Hello%20JSR%20EV%20SPARE%20PARTS%2C%20I%20would%20like%20to%20enquire%20about%20wholesale%20rates."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="faq__link"
                          aria-label="WhatsApp enquiry for wholesale rates (opens in a new tab)"
                        >
                          WhatsApp
                        </a>{" "}
                        us on{" "}
                        <a href="tel:+919990120067" className="faq__link">
                          +91 9990120067
                        </a>{" "}
                        for wholesale rates.
                      </p>
                    ) : (
                      <p className="faq__answer">{item.answer}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
