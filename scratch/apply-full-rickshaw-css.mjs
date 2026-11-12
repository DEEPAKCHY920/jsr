import fs from 'fs';

let css = fs.readFileSync('frontend/style.css', 'utf8');

// 1. Update .site-footer
const siteFooterRegex = /\.site-footer \{[\s\S]*?\r?\n\}/;
const newSiteFooter = `.site-footer {
  position: relative;
  background-color: #071B36;
  overflow: hidden;
  color: var(--text-muted);
  padding: 56px 0 36px;
  min-height: 560px;
}`;

if (siteFooterRegex.test(css)) {
  css = css.replace(siteFooterRegex, newSiteFooter);
  console.log('Updated .site-footer min-height and padding');
} else {
  console.error('Failed to match siteFooterRegex');
}

// 2. Update .site-footer__bg-vehicle and .site-footer__glow-arc
const bgVehRegex = /\/\* ── Full-Width E-Rickshaw Background across Footer ── \*\/[\s\S]*?\.site-footer__glow-arc \{[\s\S]*?\r?\n\}/;

const newBgVehCSS = `/* ── Full-Width E-Rickshaw Background across Footer ── */
.site-footer__bg-vehicle {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url('/footer-erickshaw.webp');
  background-repeat: no-repeat;
  background-position: 62% center;
  background-size: contain;
  mix-blend-mode: screen;
  opacity: 0.52;
  -webkit-mask-image: radial-gradient(ellipse 95% 95% at 62% 50%, black 85%, transparent 100%);
  mask-image: radial-gradient(ellipse 95% 95% at 62% 50%, black 85%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}

/* Electric neon curved arc light across bottom */
.site-footer__glow-arc {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.85;
}`;

if (bgVehRegex.test(css)) {
  css = css.replace(bgVehRegex, newBgVehCSS);
  console.log('Updated .site-footer__bg-vehicle and .site-footer__glow-arc');
} else {
  console.error('Failed to match bgVehRegex');
}

// 3. Responsive tweaks
// In max-width: 1200px
const media1200Regex = /@media \(max-width: 1200px\) \{\r?\n\s*\.site-footer__bg-vehicle \{[\s\S]*?\r?\n\s*\}\r?\n\s*\}/;
const media1200Replacement = `@media (max-width: 1200px) {
  .site-footer__bg-vehicle {
    background-position: 62% center;
    background-size: contain;
    opacity: 0.46;
  }
}`;

if (media1200Regex.test(css)) {
  css = css.replace(media1200Regex, media1200Replacement);
  console.log('Updated media 1200px');
}

// In max-width: 768px
const media768Regex = /\.site-footer__bg-vehicle \{\r?\n\s*background-position: center 30%;[\s\S]*?\.site-footer__glow-arc \{\r?\n\s*height: 80px;\r?\n\s*opacity: 0.65;\r?\n\s*\}/;
const media768Replacement = `.site-footer {
    min-height: auto;
    padding: 44px 0 28px;
  }

  .site-footer__bg-vehicle {
    background-position: center 35%;
    background-size: contain;
    opacity: 0.32;
  }

  .site-footer__glow-arc {
    height: 50px;
    opacity: 0.65;
  }`;

if (media768Regex.test(css)) {
  css = css.replace(media768Regex, media768Replacement);
  console.log('Updated media 768px');
} else {
  console.log('Could not match media768Regex');
}

fs.writeFileSync('frontend/style.css', css, 'utf8');
console.log('Successfully wrote frontend/style.css');

