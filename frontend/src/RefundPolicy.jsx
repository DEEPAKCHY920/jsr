export default function RefundPolicy() {
  return (
    <main className="legal-page" aria-labelledby="refund-heading">
      <div className="container legal-page__container">
        <nav className="legal-page__breadcrumb" aria-label="Breadcrumb">
          <a href="/" className="legal-page__breadcrumb-link">Home</a>
          <span aria-hidden="true" className="legal-page__breadcrumb-sep">/</span>
          <span aria-current="page">Refund &amp; Return Policy</span>
        </nav>

        <header className="legal-page__header">
          <h1 id="refund-heading" className="legal-page__title">Refund &amp; Return Policy</h1>
          <p className="legal-page__updated">Last Updated: November 2026</p>
        </header>

        <section className="legal-page__content">
          <p>
            At <strong>JSR EV Spare Parts</strong> (Sector 18, Rohini, Delhi), we value our customers and strive to supply genuine, tested electric rickshaw and scooter components. Because electrical and automotive spares require specific installation safeguards, please review our refund, return, and exchange terms below.
          </p>

          <h2>1. Return &amp; Exchange Eligibility Period</h2>
          <p>
            Non-electrical mechanical spare parts (such as bearings, metal brackets, suspensions, standard hardware) purchased in-store may be returned or exchanged within:
          </p>
          <div className="legal-page__notice" role="note">
            <p>
              <strong>Return Window:</strong> <em>[TODO: Owner to confirm return timeframe &mdash; standard recommendation: 3 to 7 business days from invoice date]</em>
            </p>
          </div>
          <p>To qualify for a return or exchange:</p>
          <ul>
            <li>The item must be in its original, undamaged packaging.</li>
            <li>The item must show no signs of attempted installation, thread damage, scratches, oil, or tool marks.</li>
            <li>You must present the original cash memo / bill of purchase from JSR EV Spare Parts.</li>
          </ul>

          <h2>2. Electrical Components Policy</h2>
          <p>
            Due to the sensitive nature of electric vehicle electronics:
          </p>
          <ul>
            <li><strong>Testing at Counter:</strong> Electrical parts (including motors, controllers, digital meters, throttle sets, converters, and relays) are tested or verified at our counter at the time of purchase where feasible.</li>
            <li><strong>Fitted/Burnt Items Non-Returnable:</strong> Any electrical component that has been connected to vehicle wiring, subjected to short circuits, over-voltage, improper polarity, or water ingress cannot be returned or refunded.</li>
            <li><strong>Manufacturer Warranty:</strong> If an item carries an official manufacturer warranty, we will gladly assist in routing the unit through the manufacturer&rsquo;s warranty procedure.</li>
          </ul>

          <h2>3. Non-Returnable Items</h2>
          <ul>
            <li>Consumables and wear-and-tear parts (tyres, brake pads/shoes, grease, rubber boots, wiring harnesses once cut/soldered).</li>
            <li>Items sold under clearance, wholesale discount, or customized/ordered specifically on non-standard request.</li>
            <li>Parts missing original labels, seals, or batch numbers.</li>
          </ul>

          <h2>4. Refund Method &amp; Processing</h2>
          <ul>
            <li>Approved returns are typically processed as an <strong>Exchange</strong> for the correct part or store credit.</li>
            <li>Where a monetary refund is authorized by management, it will be issued via the original payment mode (cash or UPI) within <em>[TODO: 1–3 business days]</em>.</li>
            <li>Fitting and labour charges are non-refundable once the service work has been performed.</li>
          </ul>

          <h2>5. How to Initiate a Return or Exchange</h2>
          <p>
            Please bring the part along with your invoice directly to our shop counter:
          </p>
          <address className="legal-page__contact-box">
            <strong>JSR EV Spare Parts</strong><br />
            Deepak Choudhary<br />
            Sector 18, Rohini, Delhi &ndash; 110089 (Near Data Ram Apartment)<br />
            Helpline: <a href="tel:+919990120067">+91 9990120067</a> (8:00 AM &ndash; 8:00 PM, 7 Days)
          </address>

          <div className="legal-page__actions">
            <a href="/" className="legal-page__btn">Back to Home</a>
            <div className="legal-page__related-links">
              <span className="legal-page__related-label">Related Policies:</span>
              <a href="/privacy" className="legal-page__related-link">Privacy Policy</a>
              <span className="legal-page__related-sep" aria-hidden="true">&bull;</span>
              <a href="/terms" className="legal-page__related-link">Terms &amp; Conditions</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

