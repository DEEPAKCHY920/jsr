export default function PrivacyPolicy() {
  return (
    <main className="legal-page" aria-labelledby="privacy-heading">
      <div className="container legal-page__container">
        <nav className="legal-page__breadcrumb" aria-label="Breadcrumb">
          <a href="/" className="legal-page__breadcrumb-link">Home</a>
          <span aria-hidden="true" className="legal-page__breadcrumb-sep">/</span>
          <span aria-current="page">Privacy Policy</span>
        </nav>

        <header className="legal-page__header">
          <h1 id="privacy-heading" className="legal-page__title">Privacy Policy</h1>
          <p className="legal-page__updated">Last Updated: November 2026</p>
        </header>

        <section className="legal-page__content">
          <p>
            Welcome to <strong>JSR EV Spare Parts</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We operate a local retail and wholesale shop specializing in electric rickshaw (e-rickshaw) and electric scooter spare parts, located in Sector 18, Rohini, Delhi &ndash; 110089. We respect your privacy and are committed to protecting any personal information you share with us.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            Because we operate primarily as an in-person physical store and direct phone/WhatsApp contact business, we collect only the minimal information necessary to assist with your enquiries, orders, and fitting services:
          </p>
          <ul>
            <li><strong>Contact Information:</strong> Your name, phone number, and location details when you contact us via telephone, WhatsApp (+91 9990120067), or walk into our shop.</li>
            <li><strong>Order &amp; Service Details:</strong> Inquiries regarding specific e-rickshaw or scooter spare parts, vehicle model details, quotes, and fitting service requests.</li>
            <li><strong>Payment Information:</strong> For in-store or UPI purchases, transaction records required for billing, accounting, and tax compliance. We do not store card numbers or banking passwords on this website.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your contact and enquiry details solely to:</p>
          <ul>
            <li>Check part availability and provide price quotations.</li>
            <li>Process and fulfill orders placed in person or confirmed via WhatsApp/phone.</li>
            <li>Schedule on-site part fitting or repair assistance in Sector 18, Rohini.</li>
            <li>Provide customer support, warranty validation, and after-sales service.</li>
          </ul>

          <h2>3. Information Sharing and Disclosure</h2>
          <p>
            We do not sell, rent, trade, or share your personal data with third-party marketers or brokers. We may share transaction information only when strictly necessary:
          </p>
          <ul>
            <li>With government, tax, or legal authorities when required by applicable laws of Delhi / India.</li>
            <li>With authorized manufacturer service centres if needed to process an official warranty claim on your behalf.</li>
          </ul>

          <h2>4. Cookies &amp; Tracking</h2>
          <p>
            This website does not use tracking cookies, analytics profiling cookies, or third-party advertising trackers. Standard web server logs may temporarily capture your IP address and browser type for security and server health maintenance.
          </p>

          <h2>5. Unconfirmed Business Details (Owner Verification Required)</h2>
          <div className="legal-page__notice" role="note">
            <p><strong>Notice for Shop Owner:</strong> The following fields should be confirmed:</p>
            <ul>
              {/* <li>GSTIN / Business Registration Number: <em>[TODO: To be provided by Deepak Choudhary / JSR EV Spare Parts]</em></li> */}
              <li>Official Support Email: <em>admin@jsrevtech.in</em></li>
            </ul>
          </div>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or wish to update your details, please contact us:
          </p>
          <address className="legal-page__contact-box">
            <strong>JSR EV Spare Parts</strong><br />
            Proprietor: Deepak Choudhary<br />
            Address: Sector 18, Rohini, Delhi &ndash; 110089 (Near Data Ram Apartment)<br />
            Phone / WhatsApp: <a href="tel:+919990120067">+91 9990120067</a><br />
            Business Hours: 8:00 AM &ndash; 8:00 PM (Open 7 Days)
          </address>

          <div className="legal-page__actions">
            <a href="/" className="legal-page__btn">Back to Home</a>
            <div className="legal-page__related-links">
              <span className="legal-page__related-label">Related Policies:</span>
              <a href="/terms" className="legal-page__related-link">Terms &amp; Conditions</a>
              <span className="legal-page__related-sep" aria-hidden="true">&bull;</span>
              <a href="/refund" className="legal-page__related-link">Refund &amp; Return Policy</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

