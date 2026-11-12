import fs from 'fs';

let css = fs.readFileSync('frontend/style.css', 'utf8');

// Replace .site-footer__vehicle-fullwidth (or whatever is at line 567) with .site-footer__bg-vehicle and .site-footer__glow-arc
const oldBlockRegex = /\/\* ── Full-Width E-Rickshaw Showcase ── \*\/[\s\S]*?\.site-footer__vehicle-fullwidth-img \{[\s\S]*?\r?\n\}/;

const newBgVehicleCSS = `/* ── Full-Width E-Rickshaw Background across Footer ── */
.site-footer__bg-vehicle {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url('/footer-erickshaw.webp');
  background-repeat: no-repeat;
  background-position: 60% 48%;
  background-size: 1180px auto;
  mix-blend-mode: screen;
  opacity: 0.48;
  -webkit-mask-image: radial-gradient(ellipse 95% 85% at 55% 50%, black 70%, transparent 100%);
  mask-image: radial-gradient(ellipse 95% 85% at 55% 50%, black 70%, transparent 100%);
  pointer-events: none;
  z-index: 0;
}

/* Electric neon curved arc light across bottom */
.site-footer__glow-arc {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 140px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.9;
}`;

if (oldBlockRegex.test(css)) {
  css = css.replace(oldBlockRegex, newBgVehicleCSS);
  console.log('Replaced old showcase with new full-width bg vehicle & glow arc');
} else {
  console.error('Could not match oldBlockRegex');
}

// In @media (max-width: 1200px) or general responsive media queries:
const media1200Target = `@media (max-width: 1200px) {`;
const media1200Add = `@media (max-width: 1200px) {
  .site-footer__bg-vehicle {
    background-position: 60% 50%;
    background-size: 1020px auto;
    opacity: 0.42;
  }`;

if (css.includes(media1200Target) && !css.includes('.site-footer__bg-vehicle {\r\n    background-position: 60% 50%')) {
  css = css.replace(media1200Target, media1200Add);
  console.log('Added 1200px breakpoint styling for bg vehicle');
}

// In @media (max-width: 768px):
const mobileVehicleRegex = /\.site-footer__vehicle-fullwidth \{[\s\S]*?\.site-footer__vehicle-fullwidth-img \{[\s\S]*?\r?\n\s*\}/;
const mobileVehicleReplacement = `.site-footer__bg-vehicle {
    background-position: center 30%;
    background-size: 680px auto;
    opacity: 0.28;
  }

  .site-footer__glow-arc {
    height: 80px;
    opacity: 0.65;
  }`;

if (mobileVehicleRegex.test(css)) {
  css = css.replace(mobileVehicleRegex, mobileVehicleReplacement);
  console.log('Replaced mobile fullwidth with mobile bg vehicle rules');
} else {
  console.log('mobileVehicleRegex did not match, adding to max-width: 768px section');
}

fs.writeFileSync('frontend/style.css', css, 'utf8');
console.log('Updated style.css successfully');

