import fs from "node:fs";

let css = fs.readFileSync("frontend/style.css", "utf8");

const extraStyles = `
/* ── SPARE PARTS WE STOCK TAGS ── */
.services__tags-wrap {
  margin-top: 36px;
  text-align: center;
}

.services__tags-title {
  font-size: var(--fs-md);
  font-weight: 700;
  color: var(--text-strong);
  margin-bottom: 14px;
  letter-spacing: -0.01em;
}

.services__tags-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 10px;
  max-width: 860px;
  margin: 0 auto;
}

.services__tag-pill {
  font-size: var(--fs-sm);
  color: var(--text-body);
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-full);
  padding: 6px 14px;
  font-weight: 500;
  line-height: 1.2;
}

/* ── HINDI FOOTER TAGLINE ── */
.site-footer__tagline-hi {
  font-size: var(--fs-sm);
  color: var(--text-on-dark-muted);
  text-align: center;
  margin-bottom: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
}
`;

if (!css.includes('.services__tags-wrap')) {
  css += '\n' + extraStyles;
  fs.writeFileSync('frontend/style.css', css);
  console.log('Added SEO tags and Hindi footer CSS to style.css');
} else {
  console.log('Styles already present in style.css');
}

