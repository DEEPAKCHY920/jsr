import { readFile } from "node:fs/promises";

const targetPhrases = [
  "e-rickshaw spare parts in Rohini",
  "electric scooter spare parts",
  "EV spare parts Delhi",
  "repair and fitting",
  "Sector 18, Rohini"
];

const files = [
  "frontend/src/Hero.jsx",
  "frontend/src/About.jsx",
  "frontend/src/Services.jsx",
  "frontend/src/WhyChooseUs.jsx",
  "frontend/src/StatsStrip.jsx",
  "frontend/src/Contact.jsx",
  "frontend/src/Footer.jsx",
  "frontend/src/FAQ.jsx"
];

for (const phrase of targetPhrases) {
  console.log(`\n========================================`);
  console.log(`PHRASE: "${phrase}"`);
  console.log(`========================================`);
  const reg = new RegExp(phrase.replace(/-/g, "[- ]"), "gi");
  let total = 0;
  for (const f of files) {
    const content = await readFile(f, "utf8");
    const lines = content.split("\n");
    lines.forEach((line, idx) => {
      if (reg.test(line)) {
        total++;
        console.log(`${f}:${idx + 1}: ${line.trim()}`);
      }
    });
  }
  console.log(`TOTAL in source files: ${total}`);
}
