import fs from 'fs';

let css = fs.readFileSync('frontend/style.css', 'utf8');

// 1. Remove .site-footer__glow-arc block
const glowArcRegex = /\/\* Electric neon curved arc light across bottom \*\/\r?\n\.site-footer__glow-arc \{[\s\S]*?\r?\n\}/;
if (glowArcRegex.test(css)) {
  css = css.replace(glowArcRegex, '');
  console.log('Removed desktop .site-footer__glow-arc');
} else {
  console.error('Could not find desktop glowArcRegex');
}

// 2. Remove mobile .site-footer__glow-arc
const mobileGlowArcRegex = /\.site-footer__glow-arc \{\r?\n\s*height: 50px;\r?\n\s*opacity: 0\.65;\r?\n\s*\}/;
if (mobileGlowArcRegex.test(css)) {
  css = css.replace(mobileGlowArcRegex, '');
  console.log('Removed mobile .site-footer__glow-arc');
} else {
  console.log('mobileGlowArcRegex not matched or already clean');
}

fs.writeFileSync('frontend/style.css', css, 'utf8');
console.log('Saved style.css');

