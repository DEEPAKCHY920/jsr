import fs from 'fs';

let css = fs.readFileSync('frontend/style.css', 'utf8');

// 1. Replace .site-footer__bg-vehicle with .site-footer__vehicle-fullwidth
const bgVehicleRegex = /\/\* Subtle e-rickshaw background image on right \(Desktop\) \*\/\r?\n\.site-footer__bg-vehicle \{[\s\S]*?\r?\n\}/;

const fullwidthRules = `/* ── Full-Width E-Rickshaw Showcase ── */
.site-footer__vehicle-fullwidth {
  width: 100%;
  max-width: 1200px;
  margin: 12px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.site-footer__vehicle-fullwidth-img {
  width: 100%;
  max-width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  filter: drop-shadow(0 14px 38px rgba(0, 0, 0, 0.45));
}`;

if (bgVehicleRegex.test(css)) {
  css = css.replace(bgVehicleRegex, fullwidthRules);
  console.log('Replaced .site-footer__bg-vehicle');
} else {
  console.error('Failed to match bgVehicleRegex');
}

// 2. In mobile section (@media (max-width: 768px)), update .site-footer__social-wrap and add mobile rules for fullwidth
const mobileTargetRegex = /\.site-footer__social-rickshaw \{\r?\n\s*display: block !important;[\s\S]*?\r?\n\s*\}\r?\n\s*\.site-footer__bg-vehicle \{\r?\n\s*display: none !important;\r?\n\s*\}/;

const mobileReplacement = `.site-footer__social-rickshaw {
    display: none !important;
  }

  .site-footer__vehicle-fullwidth {
    margin: 4px auto 0;
  }

  .site-footer__vehicle-fullwidth-img {
    max-height: 260px;
  }`;

if (mobileTargetRegex.test(css)) {
  css = css.replace(mobileTargetRegex, mobileReplacement);
  console.log('Replaced mobile social-rickshaw & bg-vehicle');
} else {
  console.error('Failed to match mobileTargetRegex');
}

fs.writeFileSync('frontend/style.css', css, 'utf8');
console.log('Successfully updated frontend/style.css');

