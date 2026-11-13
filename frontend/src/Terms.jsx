export default function Terms() {
  return (
    <main className="legal-page" aria-labelledby="terms-heading">
      <div className="container legal-page__container">
        <nav className="legal-page__breadcrumb" aria-label="Breadcrumb">
          <a href="/" className="legal-page__breadcrumb-link">Home</a>
          <span aria-hidden="true" className="legal-page__breadcrumb-sep">/</span>
          <span aria-current="page">Terms &amp; Conditions</span>
        </nav>

        <header className="legal-page__header">
          <h1 id="terms-heading" className="legal-page__title">Terms &amp; Conditions</h1>
          <p className="legal-page__updated">Last Updated: November 2026</p>
        </header>

        <section className="legal-page__content">
          <p>
            These Terms &amp; Conditions govern the sale of goods, fitting services, and use of information provided by <strong>JSR EV Spare Parts</strong>, located at Sector 18, Rohini, Delhi &ndash; 110089. By purchasing spare parts, requesting repairs, or utilizing our services, you agree to comply with and be bound by these terms.
          </p>

          <h2>1. Business Scope &amp; Offerings</h2>
          <p>
            JSR EV Spare Parts supplies genuine parts, accessories, and maintenance solutions for commercial electric rickshaws (e-rickshaws) and electric two-wheelers (e-scooters). Our catalog includes, but is not limited to: electric motors, motor controllers, differential gears, shockers, throttle grips, wiring harnesses, brake shoes, headlights, tyres, and chargers.
          </p>

          <h2>2. Quotes, Pricing &amp; Payment</h2>
          <ul>
            <li><strong>Quotes:</strong> Prices quoted via telephone or WhatsApp are valid on the date issued and subject to market stock fluctuations.</li>
            <li><strong>Pricing:</strong> All in-store purchases are billed at the prevailing retail or wholesale rate agreed at the time of sale.</li>
            <li><strong>Payment Methods:</strong> We accept cash, UPI, and bank transfers as verified at our physical counter. Full payment is due upon delivery or installation of the parts.</li>
          </ul>

          <h2>3. Compatibility &amp; Fitting Verification</h2>
          <p>
            Electric rickshaw specifications (voltage, wattage, connector pinouts, shaft dimensions) vary across manufacturers. Customers and mechanics are responsible for confirming part compatibility before installation. Our staff is available on-site at Sector 18, Rohini to inspect your existing sample part or vehicle to ensure a proper match.
          </p>

          <h2>4. Installation &amp; Repair Services</h2>
          <p>
            Where fitting services are provided at our shop premises:
          </p>
          <ul>
            <li>Fitting is carried out with professional care based on standard industry practices.</li>
            <li>We are not responsible for pre-existing vehicle electrical wiring faults, short circuits, or battery defects that may damage newly fitted electrical components.</li>
          </ul>

          <h2>5. Warranty &amp; Limitation of Liability</h2>
          <ul>
            <li>Manufacturer warranties (if provided for specific items such as motors, controllers, or chargers) are governed strictly by the respective manufacturer&rsquo;s warranty policy.</li>
            <li>Wear-and-tear items (such as brake shoes, tyres, bearings, cables, and cosmetic plastics) are not covered under warranty once used.</li>
            <li>To the maximum extent permitted by applicable law, our total liability is limited to the purchase price paid for the specific part.</li>
          </ul>

          {/* <h2>6. Unconfirmed Details (Owner Verification Required)</h2>
          <div className="legal-page__notice" role="note">
            <p><strong>Notice for Shop Owner:</strong> Please verify the following:</p>
            <ul> */}
          {/* //     {/* <li>GST / Trade License ID: <em>[TODO: To be provided by owner]</em></li> */}
          {/* //     <li>Official Legal Entity Name: <em>[TODO: Confirm Sole Proprietorship: Deepak Choudhary / JSR EV Spare Parts]</em></li>
          //   </ul>
          // </div> */}   

          <h2>6. Governing Law &amp; Jurisdiction</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with sales or services shall be subject to the exclusive jurisdiction of the competent courts in Delhi.
          </p>

          <h2>7. Contact Information</h2>
          <address className="legal-page__contact-box">
            <strong>JSR EV Spare Parts</strong><br />
            Founder: Deepak Choudhary<br />
            Sector 18, Rohini, Delhi &ndash; 110089 (Near Data Ram Apartment)<br />
            Phone: <a href="tel:+919990120067">+91 9990120067</a> <br />
           Email: <a href="mailto:admin@jsrevtech.in">admin@jsrevtech.in</a>
          </address>

          <div className="legal-page__actions">
            <a href="/" className="legal-page__btn">Back to Home</a>
            <div className="legal-page__related-links">
              <span className="legal-page__related-label">Related Policies:</span>
              <a href="/privacy" className="legal-page__related-link">Privacy Policy</a>
              <span className="legal-page__related-sep" aria-hidden="true">&bull;</span>
              <a href="/refund" className="legal-page__related-link">Refund &amp; Return Policy</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

