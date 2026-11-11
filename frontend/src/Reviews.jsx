import { GOOGLE_REVIEW_URL, GOOGLE_PROFILE_URL } from "./config/reviews.js";

export default function Reviews() {
  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-heading">
      <div className="container reviews__inner">
        {/* Header */}
        <header className="reviews__header reveal-up">
          <div className="reviews__badge-row">
            <span className="reviews__badge">CUSTOMER REVIEWS</span>
            <span className="reviews__badge-line" aria-hidden="true" />
          </div>

          <h2 className="reviews__heading" id="reviews-heading">
            Customer Reviews
          </h2>
          <span className="reviews__heading-accent" aria-hidden="true" />

          <p className="reviews__subtitle">
            Your feedback helps us serve you better. Share your experience with JSR EV SPARE PARTS.
          </p>
        </header>

        {/* Centered Review Card */}
        <div className="reviews__card reveal-up">
          {/* Decorative Stars Banner */}
          <div className="reviews__stars" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="reviews__star-icon"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="#f59e0b"
                focusable="false"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>

          <p className="reviews__card-title">Share Your Thoughts on Google</p>
          <p className="reviews__card-desc">
            Whether you visited us for genuine e-rickshaw spare parts, battery chargers, or vehicle repairs, we value your direct feedback.
          </p>

          {/* Action Buttons */}
          <div className="reviews__actions">
            <a
              href={GOOGLE_REVIEW_URL}
              className="reviews__btn reviews__btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Write a Google Review for JSR EV Spare Parts (opens in a new tab)"
            >
              <svg
                className="reviews__btn-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span>Write a Google Review</span>
            </a>

            <a
              href={GOOGLE_PROFILE_URL}
              className="reviews__btn reviews__btn--secondary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read all Google reviews for JSR EV Spare Parts (opens in a new tab)"
            >
              <svg
                className="reviews__btn-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>Read All Reviews</span>
            </a>
          </div>

          {/* Neutral Guidance Note */}
          <p className="reviews__note">
            Your review will open on Google, where you can choose your rating and write your own feedback.
          </p>
        </div>
      </div>
    </section>
  );
}
