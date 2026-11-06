import heroImage640 from "../assets/images/hero-ev-640.webp";
import heroImage1280 from "../assets/images/hero-ev-1280.webp";

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow">JSR EV SPARE PARTS · ROHINI, DELHI</p>

          <h1 className="hero__heading" id="hero-heading">
            Your destination for
            <br />
            <span className="hero__highlight">E-Rickshaw</span>
            <br />
            Spare Parts
          </h1>

          <p className="hero__desc">
            E-rickshaw spare parts and electric scooter spare parts.
            <br />
            Contact us to find the right part for your vehicle.
          </p>

          <div className="hero__actions">
            <a
              href="https://wa.me/919990120067?text=Hello%20JSR%20EV%20SPARE%20PARTS%2C%20I%20would%20like%20to%20enquire%20about%20spare%20parts%20or%20services."
              className="hero__btn hero__btn--whatsapp"
              aria-label="Send JSR EV SPARE PARTS a WhatsApp enquiry"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="hero__wa-icon"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="#65D510"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" />
              </svg>
              WhatsApp Enquiry
            </a>
          </div>
        </div>

        <div className="hero__image-wrap">
          <span className="hero__corner hero__corner--tr" aria-hidden="true" />
          <span className="hero__corner hero__corner--bl" aria-hidden="true" />
          <img
            src={heroImage1280}
            srcSet={`${heroImage640} 640w, ${heroImage1280} 1280w`}
            sizes="(max-width: 399px) 100vw, (min-width: 1200px) 576px, (min-width: 900px) calc(50vw - 44px), calc(100vw - 40px)"
            alt="Blue e-rickshaw with motor, controller and charger spare parts"
            className="hero__img"
            width="1280"
            height="853"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
