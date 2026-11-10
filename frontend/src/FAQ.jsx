import { useState } from "react";

const faqItems = [
  {
    id: "location",
    question: "Where is JSR EV SPARE PARTS located in Rohini?",
    answer:
      "Our physical shop is located in Sector 18, Rohini, Delhi – 110089 (near Data Ram Apartment). You can visit our store directly for spare parts purchase, repair advice, and fitting services.",
  },
  {
    id: "parts-range",
    question: "Which electric vehicle spare parts do you sell?",
    answer:
      "We stock genuine spare parts for e-rickshaws and electric scooters, including BLDC motors, speed controllers, throttle handles, wiring harnesses, suspension shockers, headlights, tail lamps, and brake shoes.",
  },
  {
    id: "repair-fitting",
    question: "Do you provide repair and fitting services at the shop?",
    answer:
      "Yes. In addition to spare parts sales, our experienced technicians provide on-site repair and parts fitting services for e-rickshaws and electric scooters right at our Sector 18 shop.",
  },
  {
    id: "hours",
    question: "What are your shop timings?",
    answer:
      "Our shop is open every day from 8:00 AM to 8:00 PM, serving retail customers, drivers, mechanics, and local dealers across Rohini and North Delhi.",
  },
  {
    id: "availability",
    question: "How can I check if a spare part is currently in stock?",
    answer:
      "You can call us directly at +91 9990120067 or send a WhatsApp message with the name or photo of the part you need for an immediate availability check and price quote.",
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
            Reliable information on spare parts, shop location, timings, and fitting services in Sector 18, Rohini.
          </p>
        </header>

        <div className="faq__list reveal-up">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`faq__item${isOpen ? " faq__item--open" : ""}`}
              >
                <button
                  type="button"
                  className="faq__trigger"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                >
                  <span className="faq__question-text">{item.question}</span>
                  <span className={`faq__chevron${isOpen ? " faq__chevron--open" : ""}`} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className="faq__panel"
                >
                  <div className="faq__panel-inner">
                    <p className="faq__answer-text">{item.answer}</p>
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

