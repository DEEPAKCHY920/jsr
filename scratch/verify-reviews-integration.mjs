import { readFile } from "node:fs/promises";

const html = await readFile("frontend/dist/index.html", "utf8");

console.log("=== 1. CHECK SECTION & CONTENT IN PRERENDERED HTML ===");
const hasSection = html.includes('id="reviews"');
const hasHeading = html.includes('Customer Reviews');
const hasSubtitle = html.includes('Your feedback helps us serve you better. Share your experience with JSR EV SPARE PARTS.');
const hasNote = html.includes('Your review will open on Google, where you can choose your rating and write your own feedback.');

console.log("Section #reviews present:", hasSection);
console.log("Heading present:", hasHeading);
console.log("Subtitle present:", hasSubtitle);
console.log("Note present:", hasNote);

console.log("\n=== 2. BYTE-FOR-BYTE URL VERIFICATION ===");
const expectedReviewUrl = "https://g.page/r/CSGeGiJGb0-IEBM/review";
const expectedProfileUrl = "https://share.google/6Zp1shhSR81Sidhjp";

const reviewMatches = [...html.matchAll(new RegExp(expectedReviewUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'))];
const profileMatches = [...html.matchAll(new RegExp(expectedProfileUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'))];

console.log(`Found exact review URL (${expectedReviewUrl}): ${reviewMatches.length} times`);
console.log(`Found exact profile URL (${expectedProfileUrl}): ${profileMatches.length} times`);

console.log("\n=== 3. TARGET, REL, ARIA-LABEL ATTRIBUTES ===");
const reviewLinkMatches = [...html.matchAll(/<a[^>]*href="https:\/\/g\.page\/r\/CSGeGiJGb0-IEBM\/review"[^>]*>/g)];
reviewLinkMatches.forEach((m, idx) => {
  const tag = m[0];
  console.log(`[Review Link ${idx+1}]`);
  console.log(`  target="_blank":`, tag.includes('target="_blank"'));
  console.log(`  rel="noopener noreferrer":`, tag.includes('rel="noopener noreferrer"'));
  console.log(`  aria-label:`, tag.match(/aria-label="([^"]*)"/)?.[1]);
});

const profileLinkMatches = [...html.matchAll(/<a[^>]*href="https:\/\/share\.google\/6Zp1shhSR81Sidhjp"[^>]*>/g)];
profileLinkMatches.forEach((m, idx) => {
  const tag = m[0];
  console.log(`[Profile Link ${idx+1}]`);
  console.log(`  target="_blank":`, tag.includes('target="_blank"'));
  console.log(`  rel="noopener noreferrer":`, tag.includes('rel="noopener noreferrer"'));
  console.log(`  aria-label:`, tag.match(/aria-label="([^"]*)"/)?.[1]);
});

console.log("\n=== 4. CONFIRM NO AGGREGATERATING / REVIEW JSON-LD ===");
const jsonLdScripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
let hasRatings = false;
jsonLdScripts.forEach((s) => {
  if (s[1].includes("aggregateRating") || s[1].includes('"review"')) {
    hasRatings = true;
  }
});
console.log("JSON-LD contains ratings/reviews:", hasRatings);

console.log("\n=== 5. CHECK TARGET PHRASE FREQUENCY (AT MOST TWICE) ===");
const targetPhrases = [
  "e-rickshaw spare parts in Rohini",
  "electric scooter spare parts",
  "EV spare parts Delhi",
  "repair and fitting",
  "Sector 18, Rohini"
];

const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
const withoutScripts = bodyMatch[1]
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "");
const visibleText = withoutScripts.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");

for (const phrase of targetPhrases) {
  const reg = new RegExp(phrase.replace(/-/g, "[- ]"), "gi");
  const count = (visibleText.match(reg) || []).length;
  console.log(`"${phrase}": ${count} times (<= 2: ${count <= 2})`);
}
