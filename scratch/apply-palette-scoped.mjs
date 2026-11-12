import fs from 'fs';

let css = fs.readFileSync('frontend/style.css', 'utf8');

// Header and .site-footer
const siteFooterOld = `/* ================================================================
   SITE FOOTER (Automotive Premium Dark Navy Redesign)
   Colors:
     Background:   #071B36
     Primary Blue: #1764D8
     Accent Green: #65C91A
     Headings:     #FFFFFF
     Text:         #CBD5E1 / #94A3B8
================================================================ */
.site-footer {
  position: relative;
  background-color: #071B36;
  overflow: hidden;
  color: var(--text-muted);
  padding: 56px 0 36px;
  min-height: 560px;
}`;

const siteFooterNew = `/* ================================================================
   SITE FOOTER (Automotive Premium Dark Navy Redesign)
   Recommended Color Palette:
     Background:           #071B35
     Secondary background: #102B4C
     Primary text:         #FFFFFF
     Secondary text:       #C1CDDA
     Green accent:         #39D000
     Blue icons:           #1677E8
================================================================ */
.site-footer {
  --footer-bg: #071B35;
  --footer-bg-secondary: #102B4C;
  --footer-text-primary: #FFFFFF;
  --footer-text-muted: #C1CDDA;
  --footer-green-accent: #39D000;
  --footer-blue-icon: #1677E8;

  position: relative;
  background-color: var(--footer-bg);
  overflow: hidden;
  color: var(--footer-text-muted);
  padding: 56px 0 36px;
  min-height: 560px;
}`;

// Normalise CRLF for exact match
const norm = (s) => s.replace(/\r\n/g, '\n');
if (norm(css).includes(norm(siteFooterOld))) {
  css = norm(css).replace(norm(siteFooterOld), norm(siteFooterNew));
  console.log('Replaced .site-footer with palette variables');
} else {
  console.error('Could not match siteFooterOld');
}

// 1. Highlight items (Secondary background: #102B4C, Text: #C1CDDA, Hover border: #39D000)
css = css.replace(
  /\.site-footer__highlight-item \{[\s\S]*?background-color: rgba\(255, 255, 255, 0\.03\);[\s\S]*?border: 1px solid rgba\(255, 255, 255, 0\.08\);/,
  `.site-footer__highlight-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 4px;
  border-radius: var(--radius-md);
  background-color: var(--footer-bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.08);`
);

css = css.replace(
  /\.site-footer__highlight-item:hover \{[\s\S]*?background-color: rgba\(255, 255, 255, 0\.06\);[\s\S]*?border-color: rgba\(101, 201, 26, 0\.3\);/,
  `.site-footer__highlight-item:hover {
  background-color: #173860;
  border-color: rgba(57, 208, 0, 0.45);`
);

css = css.replace(
  /\.site-footer__highlight-label \{[\s\S]*?color: var\(--text-on-dark-muted\);/,
  `.site-footer__highlight-label {
  font-size: var(--fs-xs);
  font-weight: 700;
  color: var(--footer-text-muted);`
);

// 2. Heading bar & logo line (Green accent: #39D000)
css = css.replace(
  /\.site-footer__logo-line \{[\s\S]*?background-color: #65C91A;/,
  `.site-footer__logo-line {
  display: block;
  width: 24px;
  height: 3px;
  background-color: var(--footer-green-accent);`
);

css = css.replace(
  /\.site-footer__heading-bar \{[\s\S]*?background-color: #65C91A;/,
  `.site-footer__heading-bar {
  display: block;
  width: 40px;
  height: 3px;
  margin-top: 8px;
  border-radius: var(--radius-sm);
  background-color: var(--footer-green-accent);`
);

// 3. Quick Links (Secondary text: #C1CDDA, Green arrow: #39D000, Hover: #FFFFFF)
css = css.replace(
  /\.site-footer__link \{[\s\S]*?color: var\(--text-on-dark-muted\);/,
  `.site-footer__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--footer-text-muted);`
);

css = css.replace(
  /\.site-footer__link-arrow \{[\s\S]*?color: var\(--text-success\);/,
  `.site-footer__link-arrow {
  color: var(--footer-green-accent);`
);

css = css.replace(
  /\.site-footer__link:hover \{[\s\S]*?color: var\(--text-on-dark\);/,
  `.site-footer__link:hover {
  color: var(--footer-text-primary);`
);

// 4. Contact & Timings (Blue icons: #1677E8, Green: #39D000, Text: #C1CDDA)
css = css.replace(
  /\.site-footer__icon-badge--blue \{[\s\S]*?background-color: #1764D8;/,
  `.site-footer__icon-badge--blue {
  background-color: var(--footer-blue-icon);`
);

css = css.replace(
  /\.site-footer__icon-badge--green \{[\s\S]*?background-color: #65C91A;/,
  `.site-footer__icon-badge--green {
  background-color: var(--footer-green-accent);`
);

css = css.replace(
  /\.site-footer__contact-link \{[\s\S]*?color: var\(--text-on-dark-muted\);/,
  `.site-footer__contact-link {
  color: var(--footer-text-muted);`
);

css = css.replace(
  /\.site-footer__contact-link:hover \{[\s\S]*?color: var\(--text-success\);/,
  `.site-footer__contact-link:hover {
  color: var(--footer-green-accent);`
);

css = css.replace(
  /\.site-footer__contact-link--email \{[\s\S]*?color: var\(--text-on-dark-muted\);/,
  `.site-footer__contact-link--email {
  color: var(--footer-text-muted);`
);

css = css.replace(
  /\.site-footer__contact-text \{[\s\S]*?color: var\(--text-on-dark-muted\);/,
  `.site-footer__contact-text {
  color: var(--footer-text-muted);`
);

css = css.replace(
  /\.site-footer__text-muted \{[\s\S]*?color: var\(--text-muted\);/,
  `.site-footer__text-muted {
  color: var(--footer-text-muted);
  opacity: 0.82;`
);

css = css.replace(
  /\.site-footer__text-accent \{[\s\S]*?color: var\(--text-success\);/,
  `.site-footer__text-accent {
  color: var(--footer-green-accent);`
);

// 5. Social buttons (Secondary bg: #102B4C, Hover: #1677E8)
css = css.replace(
  /\.site-footer__social-btn \{[\s\S]*?background-color: rgba\(23, 100, 216, 0\.25\);[\s\S]*?border: 1px solid rgba\(23, 100, 216, 0\.45\);/,
  `.site-footer__social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background-color: var(--footer-bg-secondary);
  border: 1px solid rgba(22, 119, 232, 0.45);`
);

css = css.replace(
  /\.site-footer__social-btn:hover \{[\s\S]*?background-color: #1764D8;[\s\S]*?border-color: #1764D8;/,
  `.site-footer__social-btn:hover {
  background-color: var(--footer-blue-icon);
  border-color: var(--footer-blue-icon);`
);

// 6. Footer description
css = css.replace(
  /\.site-footer__description \{[\s\S]*?color: var\(--text-muted\);/,
  `.site-footer__description {
  margin-top: 18px;
  color: var(--footer-text-muted);`
);

// 7. Hindi line & legal links
css = css.replace(
  /\.site-footer__tagline-hi \{[\s\S]*?color: var\(--text-on-dark-muted\);/,
  `.site-footer__tagline-hi {
  font-size: var(--fs-sm);
  color: var(--footer-text-muted);`
);

css = css.replace(
  /\.site-footer__copyright \{[\s\S]*?color: var\(--text-on-dark-muted\);/,
  `.site-footer__copyright {
  font-size: var(--fs-sm);
  color: var(--footer-text-muted);`
);

css = css.replace(
  /\.site-footer__legal-link \{[\s\S]*?color: var\(--text-muted\);/,
  `.site-footer__legal-link {
  color: var(--footer-text-muted);`
);

fs.writeFileSync('frontend/style.css', css, 'utf8');
console.log('Saved palette scoped style.css');

