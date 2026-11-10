import fs from "node:fs";

let css = fs.readFileSync("frontend/style.css", "utf8");

// 1. Add :root block if not present
const rootBlock = `:root {
  /* ── TYPE SCALE (Snapping steps) ── */
  --fs-xs: 0.75rem;                       /* 12px: Eyebrows, legal, tags */
  --fs-sm: 0.875rem;                      /* 14px: Secondary text, subtext, badges */
  --fs-md: 1rem;                          /* 16px: Standard body, buttons, inputs */
  --fs-lg: 1.125rem;                      /* 18px: Card titles, emphasized text */
  --fs-xl: 1.5rem;                        /* 24px: Subheadings, stat numbers */
  --fs-2xl: clamp(1.75rem, 1.2rem + 2vw, 2.25rem); /* 28-36px: Section headings (H2) */
  --fs-3xl: clamp(2rem, 1.3rem + 3vw, 3.25rem);    /* 32-52px: Hero title (H1) */

  /* ── TEXT COLOURS (All WCAG AA Compliant) ── */
  --text-strong: #0f1b3d;                 /* Main headings & high-emphasis text */
  --text-body: #334155;                   /* Paragraphs & body copy */
  --text-muted: #5b6577;                  /* Secondary text & captions */
  --text-primary: #1746ce;                /* Brand blue text & links */
  --text-success: #1f7a0a;                /* Green text on light backgrounds (contrast >= 4.5:1) */
  --text-on-dark: #ffffff;                /* Text on dark/solid color backgrounds */
  --text-on-dark-muted: #cbd5e1;          /* Muted text on dark backgrounds */
  --text-accent-on-dark: #65d510;         /* Electric green accent only on dark */

  /* ── CORNER RADII ── */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 999px;

  /* ── BRAND / ACCENT COLOURS ── */
  --color-primary: #1746ce;
  --color-primary-dark: #1239b0;
  --color-whatsapp: #15803d;              /* Meets 4.5:1 WCAG AA with white text */
  --color-whatsapp-hover: #166534;
}

`;

if (!css.includes("--fs-xs:")) {
  css = rootBlock + css;
}

// 2. Body color
css = css.replace(/body\s*\{([^}]*?)color:\s*#[a-fA-F0-9]+;/s, (match, p1) => {
  return `body {${p1}color: var(--text-body);`;
});

// 3. WhatsApp buttons contrast fix (WCAG AA compliant green)
css = css.replace(/\.hero__btn--whatsapp\s*\{([^}]*?)\}/s, (match) => {
  return match
    .replace(/background-color:\s*#[a-fA-F0-9]+;/g, "background-color: var(--color-whatsapp);")
    .replace(/border:\s*2px solid #[a-fA-F0-9]+;/g, "border: 2px solid var(--color-whatsapp);");
});
css = css.replace(/\.hero__btn--whatsapp:hover\s*\{([^}]*?)\}/s, (match) => {
  return match
    .replace(/background-color:\s*#[a-fA-F0-9]+;/g, "background-color: var(--color-whatsapp-hover);")
    .replace(/border-color:\s*#[a-fA-F0-9]+;/g, "border-color: var(--color-whatsapp-hover);");
});
css = css.replace(/\.floating-cta__mobile-btn--whatsapp\s*\{([^}]*?)\}/s, (match) => {
  return match.replace(/background-color:\s*#[a-fA-F0-9]+;/g, "background-color: var(--color-whatsapp);");
});
css = css.replace(/\.floating-cta__desktop-btn--whatsapp\s*\{([^}]*?)\}/s, (match) => {
  return match.replace(/background-color:\s*#[a-fA-F0-9]+;/g, "background-color: var(--color-whatsapp);");
});
css = css.replace(/\.floating-cta__desktop-btn--whatsapp:hover\s*\{([^}]*?)\}/s, (match) => {
  return match.replace(/background-color:\s*#[a-fA-F0-9]+;/g, "background-color: var(--color-whatsapp-hover);");
});

// 4. Snap font-size declarations
const fontSizeMap = [
  // Eyebrows, legal, tags: <= 12.5px
  [/font-size:\s*(?:10px|11px|11\.5px|12px|12\.5px);/g, "font-size: var(--fs-xs);"],
  // Secondary body, badges, subtext: 13px - 14.5px
  [/font-size:\s*(?:13px|13\.5px|14px|14\.5px);/g, "font-size: var(--fs-sm);"],
  // Standard body, buttons, inputs: 15px - 16.5px & small responsive clamps
  [/font-size:\s*(?:15px|15\.5px|16px|16\.5px|clamp\(16px,\s*1\.[456]vw,\s*(?:17\.5px|18px|19px)\));/g, "font-size: var(--fs-md);"],
  // Card titles, emphasized text: 17px - 19px
  [/font-size:\s*(?:17px|17\.5px|18px|18\.5px|19px);/g, "font-size: var(--fs-lg);"],
  // Subheadings, stat numbers: 21px - 28px
  [/font-size:\s*(?:21px|22px|24px|26px|27px|28px|clamp\(21px,\s*2vw,\s*26px\)|clamp\(24px,\s*2\.2vw,\s*28px\));/g, "font-size: var(--fs-xl);"],
  // Section headings (H2): 28px - 38px
  [/font-size:\s*(?:34px|38px|clamp\(22px,\s*4vw,\s*30px\)|clamp\(26px,\s*6vw,\s*30px\)|clamp\(28px,\s*2\.6vw,\s*36px\)|clamp\(28px,\s*3\.2vw,\s*42px\)|clamp\(28px,\s*3\.5vw,\s*(?:42px|44px)\));/g, "font-size: var(--fs-2xl);"],
  // Hero title (H1): 38px+ & hero clamps
  [/font-size:\s*(?:clamp\(28px,\s*6\.8vw,\s*38px\)|clamp\(30px,\s*4vw,\s*46px\)|clamp\(34px,\s*4\.2vw,\s*52px\));/g, "font-size: var(--fs-3xl);"]
];

for (const [regex, replacement] of fontSizeMap) {
  css = css.replace(regex, replacement);
}

// 5. Snap border-radius declarations
// Special frame: 24px 72px 24px 72px
css = css.replace(/border-radius:\s*24px\s+72px\s+24px\s+72px;/g, "border-radius: var(--radius-xl) 72px var(--radius-xl) 72px;");

const radiusMap = [
  [/border-radius:\s*(?:2px|4px);/g, "border-radius: var(--radius-sm);"],
  [/border-radius:\s*(?:8px|10px|12px);/g, "border-radius: var(--radius-md);"],
  [/border-radius:\s*(?:14px|16px|18px);/g, "border-radius: var(--radius-lg);"],
  [/border-radius:\s*(?:20px|22px|24px|28px);/g, "border-radius: var(--radius-xl);"],
  [/border-radius:\s*(?:50px|999px);/g, "border-radius: var(--radius-full);"],
  // Individual corners
  [/border-top-left-radius:\s*(?:8px|10px|12px);/g, "border-top-left-radius: var(--radius-md);"],
  [/border-top-right-radius:\s*(?:8px|10px|12px);/g, "border-top-right-radius: var(--radius-md);"],
  [/border-bottom-left-radius:\s*(?:8px|10px|12px);/g, "border-bottom-left-radius: var(--radius-md);"],
  [/border-bottom-right-radius:\s*(?:8px|10px|12px);/g, "border-bottom-right-radius: var(--radius-md);"],
  [/border-top-left-radius:\s*(?:14px|16px|18px);/g, "border-top-left-radius: var(--radius-lg);"],
  [/border-top-right-radius:\s*(?:14px|16px|18px);/g, "border-top-right-radius: var(--radius-lg);"],
  [/border-top-left-radius:\s*(?:20px|22px|24px|28px);/g, "border-top-left-radius: var(--radius-xl);"],
  [/border-top-right-radius:\s*(?:20px|22px|24px|28px);/g, "border-top-right-radius: var(--radius-xl);"],
  [/border-radius:\s*0\s+0\s+(?:18px|22px|28px);/g, "border-radius: 0 0 var(--radius-xl);"],
  [/border-radius:\s*(?:18px|22px|28px)\s+0\s+0;/g, "border-radius: var(--radius-xl) 0 0;"],
  [/border-radius:\s*12px\s+0\s+0\s+12px;/g, "border-radius: var(--radius-md) 0 0 var(--radius-md);"]
];

for (const [regex, replacement] of radiusMap) {
  css = css.replace(regex, replacement);
}

// 6. Snap text color declarations
// Replace text colors carefully
// Green text on light backgrounds (#2CA50D, #43A047, #65C91A, #65D510 on light backgrounds) -> var(--text-success)
css = css.replace(/(?<![a-zA-Z-])color:\s*#(?:2CA50D|2ca50d|43A047|43a047|65C91A|65c91a);/g, "color: var(--text-success);");
// Primary brand blue text (#1746CE, #1764D8, #1239B0)
css = css.replace(/(?<![a-zA-Z-])color:\s*#(?:1746CE|1746ce|1764D8|1764d8|1239B0|1239b0);/g, "color: var(--text-primary);");
// Headings / strong dark text (#101B3D, #0f1b3d)
css = css.replace(/(?<![a-zA-Z-])color:\s*#(?:101B3D|101b3d|0f1b3d);/g, "color: var(--text-strong);");
// Body / descriptions (#475569, #4B5563, #334155, #2d3a52, #303b5c, #3d4a6b)
css = css.replace(/(?<![a-zA-Z-])color:\s*#(?:475569|4B5563|4b5563|334155|2d3a52|303b5c|3d4a6b);/g, "color: var(--text-body);");
// Muted text (#5e6882, #4C5570, #4c5570, #5b6577, #94A3B8)
css = css.replace(/(?<![a-zA-Z-])color:\s*#(?:5e6882|4C5570|4c5570|5b6577|94A3B8|94a3b8);/g, "color: var(--text-muted);");
// White text (#FFFFFF, #ffffff)
css = css.replace(/(?<![a-zA-Z-])color:\s*#(?:FFFFFF|ffffff)(?!\s*!important);/g, "color: var(--text-on-dark);");
// Muted on dark (#CBD5E1, #cbd5e1)
css = css.replace(/(?<![a-zA-Z-])color:\s*#(?:CBD5E1|cbd5e1);/g, "color: var(--text-on-dark-muted);");

// Write back updated css
fs.writeFileSync("frontend/style.css", css);
console.log("Successfully applied tokens to frontend/style.css");

