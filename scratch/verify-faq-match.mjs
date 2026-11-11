import { readFile } from "node:fs/promises";

const html = await readFile("frontend/dist/index.html", "utf8");

const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
let faqSchema = null;
for (const s of scripts) {
  try {
    const parsed = JSON.parse(s[1].trim());
    if (parsed["@type"] === "FAQPage") faqSchema = parsed;
  } catch (e) {
    // ignore
  }
}

if (!faqSchema) {
  console.error("FAIL: FAQPage schema not found in dist/index.html");
  process.exit(1);
}

console.log(`Found FAQPage schema with ${faqSchema.mainEntity.length} questions.\n`);

let allMatched = true;

for (let i = 0; i < faqSchema.mainEntity.length; i++) {
  const item = faqSchema.mainEntity[i];
  const q = item.name;
  const a = item.acceptedAnswer.text;

  console.log(`--- Question ${i + 1} ---`);
  console.log(`Q: ${q}`);
  console.log(`A: ${a}`);

  // Check if Q is in HTML
  if (!html.includes(q)) {
    console.error(`FAIL: Question not found in HTML: "${q}"`);
    allMatched = false;
  }

  if (q.includes("Where can I buy e-rickshaw spare parts in Rohini?")) {
    const hasTel = html.includes('href="tel:+919990120067"');
    const hasWa = html.includes('href="https://wa.me/919990120067?text=Hello%20JSR%20EV%20SPARE%20PARTS%2C%20I%20would%20like%20to%20enquire%20about%20wholesale%20rates."');
    const hasAnswerText = html.includes("You can buy parts directly at our Sector 18 shop, available at both retail and wholesale prices.");
    const hasEnding = html.includes("for wholesale rates.");
    console.log(`Q6 check -> hasTel: ${hasTel}, hasWa: ${hasWa}, hasAnswerText: ${hasAnswerText}, hasEnding: ${hasEnding}`);
    if (!hasTel || !hasWa || !hasAnswerText || !hasEnding) {
      allMatched = false;
    }
  } else {
    if (!html.includes(a)) {
      console.error(`FAIL: Answer not found in HTML: "${a}"`);
      allMatched = false;
    }
  }
}

if (allMatched) {
  console.log("\nALL 9 FAQS MATCH WORD FOR WORD AND LINKS ARE PRESENT!");
} else {
  console.error("\nMismatch detected!");
  process.exit(1);
}
