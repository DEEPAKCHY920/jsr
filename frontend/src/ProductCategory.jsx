import { productsData } from "./data/products.js";

export default function ProductCategory({ product }) {
  if (!product) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello JSR EV SPARE PARTS, I would like to check availability and price for ${product.name}.`
  );
  const whatsappUrl = `https://wa.me/919990120067?text=${whatsappMessage}`;

  const relatedProducts = (product.related || [])
    .map((slug) => productsData.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <main className="product-page" aria-labelledby="product-heading">
      <div className="container product-page__container">
        {/* Breadcrumb Navigation */}
        <nav className="product-page__breadcrumb" aria-label="Breadcrumb">
          <ol className="product-page__breadcrumb-list" role="list">
            <li className="product-page__breadcrumb-item">
              <a href="/" className="product-page__breadcrumb-link">Home</a>
            </li>
            <li className="product-page__breadcrumb-sep" aria-hidden="true">&gt;</li>
            <li className="product-page__breadcrumb-item">
              <a href="/#spare-parts" className="product-page__breadcrumb-link">Spare Parts</a>
            </li>
            <li className="product-page__breadcrumb-sep" aria-hidden="true">&gt;</li>
            <li className="product-page__breadcrumb-item product-page__breadcrumb-item--current" aria-current="page">
              {product.shortName}
            </li>
          </ol>
        </nav>

        {/* Product Hero Layout */}
        <div className="product-page__hero">
          {/* Left Column: Image Showcase */}
          <div className="product-page__media-card">
            <div className="product-page__badge-row">
              <span className="product-page__badge">Genuine EV Spare Part</span>
              <span className="product-page__badge product-page__badge--alt">Sector 18 Rohini</span>
            </div>
            <div className="product-page__img-wrapper">
              <img
                src={product.image}
                alt={product.alt}
                width="280"
                height="200"
                loading="eager"
                decoding="async"
                className="product-page__img"
              />
            </div>
            <p className="product-page__img-note">
              Physical inspection and same-day fitting available at our Rohini Sector 18 shop.
            </p>
          </div>

          {/* Right Column: Key Details & CTAs */}
          <div className="product-page__content">
            <div className="product-page__location-tag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>JSR EV SPARE PARTS &bull; Rohini Sector 18, Delhi</span>
            </div>

            <h1 className="product-page__title" id="product-heading">
              {product.h1}
            </h1>

            <p className="product-page__summary">
              {product.summary}
            </p>

            {/* Quick Actions (Call & WhatsApp) */}
            <div className="product-page__actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="product-page__btn product-page__btn--whatsapp"
                aria-label={`Enquire about ${product.name} on WhatsApp (opens in a new tab)`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.724.888.936-3.618-.235-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182 17.43 2.182 21.818 6.57 21.818 12S17.43 21.818 12 21.818z" />
                </svg>
                <span>WhatsApp Enquiry</span>
              </a>

              <a
                href="tel:+919990120067"
                className="product-page__btn product-page__btn--call"
                aria-label="Call JSR EV Spare Parts at 9990120067"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>Call +91 9990120067</span>
              </a>
            </div>

            <div className="product-page__availability-box">
              <span className="product-page__avail-dot" aria-hidden="true" />
              <span>Available in Stock &bull; Retail &amp; Wholesale Rates &bull; Shop Open 8:00 AM &ndash; 8:00 PM</span>
            </div>
          </div>
        </div>

        {/* Technical Specifications Section */}
        <section className="product-page__section" aria-labelledby="specs-heading">
          <h2 className="product-page__section-title" id="specs-heading">
            Technical Specifications &amp; Compatibility
          </h2>
          <div className="product-page__specs-table-wrapper">
            <table className="product-page__specs-table">
              <tbody>
                {product.specs.map((item, idx) => (
                  <tr key={idx} className="product-page__specs-row">
                    <th scope="row" className="product-page__specs-label">{item.label}</th>
                    <td className="product-page__specs-value">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Key Features & Performance Section */}
        <section className="product-page__section" aria-labelledby="features-heading">
          <h2 className="product-page__section-title" id="features-heading">
            Key Features &amp; Performance Highlights
          </h2>
          <div className="product-page__features-grid">
            {product.features.map((feat, idx) => (
              <div key={idx} className="product-page__feature-card">
                <div className="product-page__feature-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1746CE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <p className="product-page__feature-text">{feat}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Shop Support & In-Shop Fitting Banner */}
        <section className="product-page__support-banner" aria-labelledby="support-heading">
          <div className="product-page__support-content">
            <h2 className="product-page__support-title" id="support-heading">
              Need Fitting or Testing for {product.name}?
            </h2>
            <p className="product-page__support-desc">
              Visit our physical store in Sector 18, Rohini, Delhi (Near Data Ram Apartment). Our experienced mechanics provide component inspection, compatibility testing, and professional on-site parts replacement.
            </p>
            <div className="product-page__support-links">
              <a href="/#contact" className="product-page__support-btn">Store Address &amp; Map</a>
              <a href="/#faq" className="product-page__support-btn product-page__support-btn--alt">Frequently Asked Questions</a>
            </div>
          </div>
        </section>

        {/* Related Product Categories */}
        {relatedProducts.length > 0 && (
          <section className="product-page__section" aria-labelledby="related-heading">
            <h2 className="product-page__section-title" id="related-heading">
              Related E-Rickshaw Spare Parts
            </h2>
            <div className="product-page__related-grid">
              {relatedProducts.map((rel) => (
                <a
                  key={rel.slug}
                  href={`/products/${rel.slug}`}
                  className="product-page__related-card"
                  aria-label={`View ${rel.name} details`}
                >
                  <div className="product-page__related-img-wrap">
                    <img
                      src={rel.image}
                      alt={rel.alt}
                      width="100"
                      height="70"
                      loading="lazy"
                      decoding="async"
                      className="product-page__related-img"
                    />
                  </div>
                  <strong className="product-page__related-name">{rel.name}</strong>
                  <span className="product-page__related-link">Explore Specs &rarr;</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Navigation Back to All Parts */}
        <div className="product-page__footer-nav">
          <a href="/#spare-parts" className="product-page__back-btn">&larr; Back to All Spare Parts</a>
        </div>
      </div>
    </main>
  );
}
