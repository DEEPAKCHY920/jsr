import fs from "node:fs";

let css = fs.readFileSync("frontend/style.css", "utf8");

const legalStyles = `
/* ================================================================
   LEGAL PAGES (Privacy Policy, Terms, Refund)
================================================================ */
.legal-page {
  padding: 48px 0 80px;
  background-color: #f8fafc;
  min-height: 80vh;
}

.legal-page__container {
  max-width: 860px;
  margin: 0 auto;
  background: var(--text-on-dark);
  border-radius: var(--radius-lg);
  padding: 48px 40px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(15, 27, 61, 0.04);
}

.legal-page__breadcrumb {
  font-size: var(--fs-sm);
  color: var(--text-muted);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
}

.legal-page__breadcrumb-link {
  color: var(--text-primary);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.legal-page__breadcrumb-sep {
  margin: 0 10px;
  color: var(--text-muted);
}

.legal-page__header {
  margin-bottom: 32px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 20px;
}

.legal-page__title {
  font-size: var(--fs-2xl);
  color: var(--text-strong);
  font-weight: 800;
  line-height: 1.25;
}

.legal-page__updated {
  font-size: var(--fs-xs);
  color: var(--text-muted);
  margin-top: 8px;
}

.legal-page__content h2 {
  font-size: var(--fs-lg);
  color: var(--text-strong);
  font-weight: 700;
  margin: 32px 0 14px;
}

.legal-page__content p,
.legal-page__content li {
  font-size: var(--fs-sm);
  color: var(--text-body);
  line-height: 1.7;
  margin-bottom: 14px;
}

.legal-page__content ul {
  padding-left: 24px;
  margin-bottom: 18px;
  list-style: disc;
}

.legal-page__content li {
  margin-bottom: 8px;
}

.legal-page__notice {
  background-color: #f0fdf4;
  border-left: 4px solid var(--text-success);
  padding: 16px 20px;
  border-radius: var(--radius-sm);
  margin: 24px 0;
}

.legal-page__notice p {
  margin-bottom: 6px;
}

.legal-page__contact-box {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-md);
  padding: 22px;
  font-style: normal;
  margin: 24px 0;
  line-height: 1.7;
}

.legal-page__contact-box a {
  color: var(--text-primary);
  font-weight: 600;
  text-decoration: underline;
}

.legal-page__actions {
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
}

.legal-page__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: var(--color-primary);
  color: var(--text-on-dark);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: var(--fs-sm);
  transition: background-color 0.2s ease, transform 0.2s ease;
}

@media (hover: hover) {
  .legal-page__btn:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-1px);
  }
}

@media (max-width: 640px) {
  .legal-page {
    padding: 24px 0 60px;
  }
  .legal-page__container {
    padding: 28px 20px;
    border-radius: var(--radius-md);
  }
}
`;

if (!css.includes('.legal-page')) {
  css += '\n' + legalStyles;
  fs.writeFileSync('frontend/style.css', css);
  console.log('Added legal styles to style.css');
} else {
  console.log('Legal styles already present');
}

