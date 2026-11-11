import { readFile } from "node:fs/promises";
import path from "node:path";

const indexHtml = await readFile("frontend/dist/index.html", "utf8");

console.log("=== 1. META KEYWORDS ===");
const kwMatch = indexHtml.match(/<meta name="keywords" content="(.*?)" \/>/);
if (kwMatch) {
  console.log("Found meta keywords tag!");
  const keywords = kwMatch[1].split(",").map(k => k.trim());
  console.log(`Keyword count: ${keywords.length}`);
} else {
  console.error("ERROR: Meta keywords tag not found!");
}

console.log("\n=== 2. TARGET PHRASES (visible text count) ===");
const targetPhrases = [
  "e-rickshaw spare parts in Rohini",
  "electric scooter spare parts",
  "EV spare parts Delhi",
  "repair and fitting",
  "Sector 18, Rohini"
];
for (const phrase of targetPhrases) {
  // Case-insensitive regex count
  const reg = new RegExp(phrase.replace(/-/g, "[- ]"), "gi");
  const matches = (indexHtml.match(reg) || []).length;
  console.log(`"${phrase}": matched ${matches} times`);
}

console.log("\n=== 3. HINDI LINE ===");
const hindiLine = "ई-रिक्शा और इलेक्ट्रिक स्कूटर स्पेयर पार्ट्स – सेक्टर 18, रोहिणी, दिल्ली";
const hasHindi = indexHtml.includes(hindiLine);
const hasLangHi = indexHtml.includes('lang="hi"');
console.log(`Hindi text present: ${hasHindi}, lang="hi" present: ${hasLangHi}`);

console.log("\n=== 4. FAQS AND FAQPAGE JSON-LD ===");
const faqQuestions = [
  "Where is JSR EV Spare Parts located in Rohini?",
  "Which electric vehicle spare parts do you sell?",
  "Do you provide repair and fitting services at the shop?",
  "What are your shop timings?",
  "How can I check if a spare part is currently in stock?",
  "Where can I buy e-rickshaw spare parts in Rohini?",
  "Which electric scooter parts do you stock?",
  "Do you offer e-rickshaw motor repair in Delhi?",
  "Do you supply complete battery packs and chargers?"
];

let allFaqsVisible = true;
for (const q of faqQuestions) {
  if (!indexHtml.includes(q)) {
    console.error(`Missing visible FAQ: "${q}"`);
    allFaqsVisible = false;
  }
}
if (allFaqsVisible) {
  console.log("All 9 visible FAQ questions found in HTML!");
}

// Check JSON-LD scripts
const jsonLdScripts = [...indexHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
console.log(`Found ${jsonLdScripts.length} JSON-LD schemas.`);

let autoPartsStoreObj = null;
let faqPageObj = null;

for (const match of jsonLdScripts) {
  try {
    const parsed = JSON.parse(match[1]);
    if (parsed["@type"] === "AutoPartsStore") autoPartsStoreObj = parsed;
    if (parsed["@type"] === "FAQPage") faqPageObj = parsed;
  } catch (e) {
    console.error("JSON parse error in schema:", e);
  }
}

if (autoPartsStoreObj) {
  console.log("AutoPartsStore schema found. areaServed:", autoPartsStoreObj.areaServed);
  console.log("AutoPartsStore has keywords field:", Boolean(autoPartsStoreObj.keywords));
} else {
  console.error("AutoPartsStore schema NOT found!");
}

if (faqPageObj) {
  console.log(`FAQPage schema found with ${faqPageObj.mainEntity?.length} items.`);
} else {
  console.error("FAQPage schema NOT found!");
}

console.log("\n=== 5. CHECK UNCONFIRMED WORDS ===");
const forbidden = [
  "same-day",
  "experienced technicians",
  "tested",
  "comprehensive catalog",
  "couplers",
  "body accessories",
  "speed controllers",
  "fleet owners trust"
];
for (const word of forbidden) {
  const reg = new RegExp(word, "gi");
  const count = (indexHtml.match(reg) || []).length;
  if (count > 0) {
    console.warn(`WARNING: Forbidden phrase found: "${word}" (${count} times)`);
  } else {
    console.log(`Clean: "${word}" not present.`);
  }
}

console.log("\n=== 6. CHECK PRIVACY/TERMS NO FAQPAGE SCHEMA ===");
const privacyHtml = await readFile("frontend/dist/privacy/index.html", "utf8");
console.log("Privacy page has FAQPage schema:", privacyHtml.includes("FAQPage"));

