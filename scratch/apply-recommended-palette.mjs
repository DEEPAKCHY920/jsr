import fs from 'fs';

// 1. Update Footer.jsx SVG icon strokes
let footerJsx = fs.readFileSync('frontend/src/Footer.jsx', 'utf8');
footerJsx = footerJsx.replaceAll('#65C91A', '#39D000');
fs.writeFileSync('frontend/src/Footer.jsx', footerJsx, 'utf8');
console.log('Updated Footer.jsx strokes to #39D000');

// 2. Update style.css
let css = fs.readFileSync('frontend/style.css', 'utf8');

// Update footer palette header comment
const footerHeaderRegex = /\/\* ================================================================\r?\n\s*SITE FOOTER[\s\S]*?================================================================ \*\//;
const newFooterHeader = `/* ================================================================
   SITE FOOTER (Automotive Premium Dark Navy Redesign)
   Recommended Color Palette:
     Background:           #071B35
     Secondary background: #102B4C
     Primary text:         #FFFFFF
     Secondary text:       #C1CDDA
     Green accent:         #39D000
     Blue icons:           #1677E8
================================================================ */`;

css = css.replace(footerHeaderRegex, newFooterHeader);

// Update .site-footer background-color
css = css.replace(/\.site-footer \{\r?\n\s*position: relative;\r?\n\s*background-color: #[0-9a-fA-F]+;/g, `.site-footer {
  position: relative;
  background-color: #071B35;`);

// Update description and labels in footer
css = css.replace(/\.site-footer__description \{[\s\S]*?color: [^;]+;/g, `.site-footer__description {
  margin-top: 18px;
  color: #C1CDDA;`);

css = css.replace(/\.site-footer__highlight-item \{[\s\S]*?background-color: [^;]+;[\s\S]*?border: [^;]+;/g, `.site-footer__highlight-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 4px;
  border-radius: var(--radius-md);
  background-color: #102B4C;
  border: 1px solid rgba(255, 255, 255, 0.08);`);

css = css.replace(/\.site-footer__highlight-item:hover \{[\s\S]*?background-color: [^;]+;[\s\S]*?border-color: [^;]+;/g, `.site-footer__highlight-item:hover {
  background-color: #163861;
  border-color: rgba(57, 208, 0, 0.45);`);

css = css.replace(/\.site-footer__highlight-label \{[\s\S]*?color: [^;]+;/g, `.site-footer__highlight-label {
  font-size: var(--fs-xs);
  font-weight: 700;
  color: #C1CDDA;`);

// Green heading bars and logo lines
css = css.replace(/\.site-footer__logo-line \{[\s\S]*?background-color: [^;]+;/g, `.site-footer__logo-line {
  display: block;
  width: 24px;
  height: 3px;
  background-color: #39D000;`);

css = css.replace(/\.site-footer__heading-bar \{[\s\S]*?background-color: [^;]+;/g, `.site-footer__heading-bar {
  display: block;
  width: 40px;
  height: 3px;
  margin-top: 8px;
  border-radius: var(--radius-sm);
  background-color: #39D000;`);

// Quick links
css = css.replace(/\.site-footer__link \{[\s\S]*?color: [^;]+;/g, `.site-footer__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #C1CDDA;`);

css = css.replace(/\.site-footer__link-arrow \{[\s\S]*?color: [^;]+;/g, `.site-footer__link-arrow {
  color: #39D000;`);

css = css.replace(/\.site-footer__link:hover \{[\s\S]*?color: [^;]+;/g, `.site-footer__link:hover {
  color: #FFFFFF;`);

// Icon badges (blue and green)
css = css.replace(/\.site-footer__icon-badge--blue \{[\s\S]*?background-color: [^;]+;/g, `.site-footer__icon-badge--blue {
  background-color: #1677E8;`);

css = css.replace(/\.site-footer__icon-badge--green \{[\s\S]*?background-color: [^;]+;/g, `.site-footer__icon-badge--green {
  background-color: #39D000;`);

// Contact links and text
css = css.replace(/\.site-footer__contact-link \{[\s\S]*?color: [^;]+;/g, `.site-footer__contact-link {
  color: #C1CDDA;`);

css = css.replace(/\.site-footer__contact-link:hover \{[\s\S]*?color: [^;]+;/g, `.site-footer__contact-link:hover {
  color: #39D000;`);

css = css.replace(/\.site-footer__contact-text \{[\s\S]*?color: [^;]+;/g, `.site-footer__contact-text {
  color: #C1CDDA;`);

css = css.replace(/\.site-footer__text-muted \{[\s\S]*?color: [^;]+;/g, `.site-footer__text-muted {
  color: #C1CDDA;
  opacity: 0.8;`);

css = css.replace(/\.site-footer__text-accent \{[\s\S]*?color: [^;]+;/g, `.site-footer__text-accent {
  color: #39D000;`);

// Social buttons
css = css.replace(/\.site-footer__social-btn \{[\s\S]*?background-color: [^;]+;[\s\S]*?border: [^;]+;/g, `.site-footer__social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background-color: #102B4C;
  border: 1px solid rgba(22, 119, 232, 0.45);`);

css = css.replace(/\.site-footer__social-btn:hover \{[\s\S]*?background-color: [^;]+;[\s\S]*?border-color: [^;]+;/g, `.site-footer__social-btn:hover {
  background-color: #1677E8;
  border-color: #1677E8;`);

// Bottom bar text
css = css.replace(/\.site-footer__copyright \{[\s\S]*?color: [^;]+;/g, `.site-footer__copyright {
  color: #C1CDDA;`);

css = css.replace(/\.site-footer__tagline-hi \{[\s\S]*?color: [^;]+;/g, `.site-footer__tagline-hi {
  font-size: var(--fs-sm);
  color: #C1CDDA;`);

css = css.replace(/\.site-footer__legal-link \{[\s\S]*?color: [^;]+;/g, `.site-footer__legal-link {
  color: #C1CDDA;`);

fs.writeFileSync('frontend/style.css', css, 'utf8');
console.log('Successfully applied recommended palette to style.css');

