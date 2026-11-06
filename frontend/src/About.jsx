const shopDetails = [
  { id: "established", label: "Established", value: "2024" },
  { id: "location", label: "Location", value: "Sector 18, Rohini, Delhi" },
  { id: "vehicles", label: "Spare Parts For", value: "E-Rickshaws & Electric Scooters" },
  { id: "services", label: "Services", value: "Spare Parts Sales, Repair & Fitting" },
  { id: "customers", label: "We Serve", value: "Retail Customers, Mechanics & Dealers" },
];

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="container about__inner">
        <div className="about__media" aria-label="Shop photo placeholder">
          <svg
            className="about__shop-icon"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M10 27h44v27H10V27Z" stroke="currentColor" strokeWidth="3" />
            <path d="M7 27 13 11h38l6 16M19 27v27M45 27v27" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
            <path d="M7 27c0 5 8 7 12 0 4 7 10 5 13 0 3 5 9 7 13 0 4 7 12 5 12 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M26 40h12" stroke="#65D510" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span>Shop photo coming soon</span>
        </div>

        <div className="about__content">
          <div className="about__label-row">
            <p className="about__label">ABOUT OUR SHOP</p>
            <span className="about__label-line" aria-hidden="true" />
          </div>
          <h2 className="about__heading" id="about-heading">About JSR EV SPARE PARTS</h2>
          <p className="about__copy">Since 2024, we have served retail customers, mechanics and dealers with spare parts, repair and fitting services for e-rickshaws and electric scooters.</p>

          <table className="about__details">
            <tbody>
              {shopDetails.map((detail) => (
                <tr className="about__detail-row" key={detail.id}>
                  <th scope="row">{detail.label}</th>
                  <td>{detail.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <a className="about__button" href="#contact">
            Contact Our Shop
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
