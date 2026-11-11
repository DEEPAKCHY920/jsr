import { readFile, stat } from "node:fs/promises";
import fs from "node:fs";
import path from "node:path";

console.log("==================================================");
console.log("       TECHNICAL SEO AUDIT & VERIFICATION         ");
console.log("==================================================");

let totalErrors = 0;
let totalWarnings = 0;

function pass(msg) {
  console.log(`[PASS] ${msg}`);
}
function fail(msg) {
  console.error(`[FAIL] ${msg}`);
  totalErrors++;
}
function warn(msg) {
  console.warn(`[WARN] ${msg}`);
  totalWarnings++;
}

// 1. Robots.txt
console.log("\n--- 1. ROBOTS.TXT CHECK ---");
try {
  const robots = await readFile("frontend/dist/robots.txt", "utf8");
  if (robots.includes("Allow: /") && robots.includes("Sitemap: https://rohini.jsrevtech.in/sitemap.xml")) {
    pass("robots.txt allows all and correctly points to sitemap.xml");
  } else {
    fail(`robots.txt content unexpected:\n${robots}`);
  }
} catch (e) {
  fail("robots.txt not found in dist!");
}

// 2. Sitemap.xml
console.log("\n--- 2. SITEMAP.XML CHECK ---");
try {
  const sitemap = await readFile("frontend/dist/sitemap.xml", "utf8");
  const expectedUrls = [
    "https://rohini.jsrevtech.in/",
    "https://rohini.jsrevtech.in/privacy",
    "https://rohini.jsrevtech.in/terms",
    "https://rohini.jsrevtech.in/refund"
  ];
  let sitemapOk = true;
  for (const u of expectedUrls) {
    if (sitemap.includes(`<loc>${u}</loc>`)) {
      pass(`Found sitemap entry: ${u}`);
    } else {
      fail(`Missing sitemap entry: ${u}`);
      sitemapOk = false;
    }
  }
} catch (e) {
  fail("sitemap.xml not found in dist!");
}

// 3. Canonicals on pages
console.log("\n--- 3. CANONICALS & METADATA PER PAGE ---");
const pages = [
  { file: "frontend/dist/index.html", expectedCanonical: "https://rohini.jsrevtech.in/" },
  { file: "frontend/dist/privacy/index.html", expectedCanonical: "https://rohini.jsrevtech.in/privacy" },
  { file: "frontend/dist/terms/index.html", expectedCanonical: "https://rohini.jsrevtech.in/terms" },
  { file: "frontend/dist/refund/index.html", expectedCanonical: "https://rohini.jsrevtech.in/refund" }
];

for (const p of pages) {
  try {
    const html = await readFile(p.file, "utf8");
    const canMatch = html.match(/<link rel="canonical" href="(.*?)" \/>/);
    if (canMatch && canMatch[1] === p.expectedCanonical) {
      pass(`${p.file} -> canonical: ${canMatch[1]}`);
    } else {
      fail(`${p.file} -> expected canonical ${p.expectedCanonical}, got: ${canMatch?.[1]}`);
    }

    // Check no duplicate canonicals
    const allCanonicals = [...html.matchAll(/<link rel="canonical"/g)];
    if (allCanonicals.length === 1) {
      pass(`${p.file} -> exactly 1 canonical tag`);
    } else {
      fail(`${p.file} -> duplicate canonical tags found: ${allCanonicals.length}`);
    }
  } catch (e) {
    fail(`Error reading ${p.file}: ${e.message}`);
  }
}

// 4. Favicon Set & Web Manifest
console.log("\n--- 4. FAVICONS & WEB MANIFEST ---");
const faviconFiles = [
  "favicon.ico",
  "favicon.svg",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "apple-touch-icon.png",
  "android-chrome-192x192.png",
  "android-chrome-512x512.png",
  "site.webmanifest"
];

for (const f of faviconFiles) {
  const p = path.join("frontend/dist", f);
  if (fs.existsSync(p)) {
    pass(`Asset exists in dist: ${f} (${fs.statSync(p).size} bytes)`);
  } else {
    fail(`Missing asset in dist: ${f}`);
  }
}

const indexHtml = await readFile("frontend/dist/index.html", "utf8");
if (indexHtml.includes('rel="icon" href="/favicon.ico"') &&
    indexHtml.includes('rel="apple-touch-icon"') &&
    indexHtml.includes('rel="manifest" href="/site.webmanifest"')) {
  pass("index.html contains link tags for favicon.ico, apple-touch-icon and webmanifest");
} else {
  fail("index.html missing some favicon/manifest link tags");
}

// 5. Open Graph & Twitter
console.log("\n--- 5. OPEN GRAPH & TWITTER CARD ---");
const ogImageP = "frontend/dist/og-image.jpg";
if (fs.existsSync(ogImageP)) {
  pass(`og-image.jpg exists in dist (${fs.statSync(ogImageP).size} bytes)`);
} else {
  fail("Missing og-image.jpg in dist!");
}

if (indexHtml.includes('content="summary_large_image"')) {
  pass('twitter:card is set to "summary_large_image"');
} else {
  fail('twitter:card is not "summary_large_image"');
}

if (indexHtml.includes('content="https://rohini.jsrevtech.in/og-image.jpg"') &&
    indexHtml.includes('property="og:image:width" content="1200"') &&
    indexHtml.includes('property="og:image:height" content="630"')) {
  pass("og:image (1200x630) meta tags are present in HTML");
} else {
  fail("og:image 1200x630 tags missing or incorrect in HTML");
}

// 6. JSON-LD Schemas Validation
console.log("\n--- 6. JSON-LD SCHEMAS VALIDATION ---");
const scriptMatches = [...indexHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
pass(`Found ${scriptMatches.length} JSON-LD schema blocks in index.html`);

let autoPartsStore = null;
let faqPage = null;

for (const s of scriptMatches) {
  try {
    const data = JSON.parse(s[1].trim());
    if (data["@type"] === "AutoPartsStore") autoPartsStore = data;
    if (data["@type"] === "FAQPage") faqPage = data;
  } catch (e) {
    fail(`JSON-LD parse error: ${e.message}`);
  }
}

if (autoPartsStore) {
  pass("AutoPartsStore schema found and parsed successfully");
  
  // Validate fields
  if (autoPartsStore["@context"] === "https://schema.org") pass("Schema context is https://schema.org");
  else fail("Invalid @context in AutoPartsStore");

  if (autoPartsStore.name === "JSR EV Spare Parts") pass("Store name matches visible brand");
  else fail(`Unexpected store name: ${autoPartsStore.name}`);

  if (autoPartsStore.url === "https://rohini.jsrevtech.in/") pass("Store url is https://rohini.jsrevtech.in/");
  else fail(`Unexpected store url: ${autoPartsStore.url}`);

  if (autoPartsStore.hasMap && autoPartsStore.hasMap.includes("maps.google.com")) {
    pass(`hasMap is set: ${autoPartsStore.hasMap}`);
  } else {
    fail("hasMap is missing or not a Google Maps URL");
  }

  if (autoPartsStore.sameAs && Array.isArray(autoPartsStore.sameAs)) {
    const fb = autoPartsStore.sameAs.some(s => s.includes("facebook.com"));
    const ig = autoPartsStore.sameAs.some(s => s.includes("instagram.com"));
    const g = autoPartsStore.sameAs.some(s => s.includes("google.com"));
    if (fb && ig && g) {
      pass(`sameAs contains Facebook, Instagram and Google (${autoPartsStore.sameAs.length} profiles)`);
    } else {
      fail(`sameAs missing one of required profiles: ${JSON.stringify(autoPartsStore.sameAs)}`);
    }
  } else {
    fail("sameAs missing or not an array");
  }

  if (autoPartsStore.geo && autoPartsStore.geo.latitude === 28.730825 && autoPartsStore.geo.longitude === 77.126488) {
    pass(`GeoCoordinates set: ${autoPartsStore.geo.latitude}, ${autoPartsStore.geo.longitude}`);
  } else {
    fail("geo coordinates missing or incorrect");
  }

  if (autoPartsStore.openingHoursSpecification &&
      autoPartsStore.openingHoursSpecification.opens === "08:00" &&
      autoPartsStore.openingHoursSpecification.closes === "20:00" &&
      autoPartsStore.openingHoursSpecification.dayOfWeek.length === 7) {
    pass("openingHoursSpecification: 08:00 - 20:00 across all 7 days");
  } else {
    fail("openingHoursSpecification incorrect");
  }

  if (autoPartsStore.aggregateRating || autoPartsStore.review) {
    fail("Schema contains ratings/reviews! Rule explicitly states: no ratings or reviews.");
  } else {
    pass("Verified: no rating or review properties in schema");
  }

  if (!autoPartsStore.priceRange) {
    warn("priceRange is omitted (awaiting user confirmation)");
  } else {
    pass(`priceRange is: ${autoPartsStore.priceRange}`);
  }
} else {
  fail("AutoPartsStore schema NOT found!");
}

if (faqPage) {
  pass(`FAQPage schema found with ${faqPage.mainEntity.length} questions`);
} else {
  fail("FAQPage schema NOT found!");
}

// 7. Google Review Button
console.log("\n--- 7. GOOGLE REVIEW BUTTON ---");
if (indexHtml.includes("Leave us a Google review")) {
  pass('Found "Leave us a Google review" button in HTML');
} else {
  fail('"Leave us a Google review" button not found in HTML');
}

// 8. Custom 404 Page & Link Audit
console.log("\n--- 8. CUSTOM 404 PAGE & LINK AUDIT ---");
const notFoundHtml = await readFile("frontend/dist/404.html", "utf8");
if (notFoundHtml.includes("404") && notFoundHtml.includes("Page Not Found") && notFoundHtml.includes("Back to Home")) {
  pass("404.html is a styled custom 404 page");
} else {
  fail("404.html is missing expected custom elements");
}

console.log("\n==================================================");
console.log(`AUDIT COMPLETE: ${totalErrors} Errors, ${totalWarnings} Warnings`);
console.log("==================================================");
if (totalErrors > 0) process.exit(1);

