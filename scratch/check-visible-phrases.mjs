import { readFile } from "node:fs/promises";

const html = await readFile("frontend/dist/index.html", "utf8");

// Extract body and strip script tags and style tags
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (!bodyMatch) {
  console.error("Could not find body in dist/index.html");
  process.exit(1);
}

const withoutScripts = bodyMatch[1]
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "");

const visibleText = withoutScripts.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");

const targetPhrases = [
  "e-rickshaw spare parts in Rohini",
  "electric scooter spare parts",
  "EV spare parts Delhi",
  "repair and fitting",
  "Sector 18, Rohini"
];

console.log("=== VISIBLE TEXT OCCURRENCES ===");
for (const phrase of targetPhrases) {
  const reg = new RegExp(phrase.replace(/-/g, "[- ]"), "gi");
  const matches = [...visibleText.matchAll(reg)];
  console.log(`\n"${phrase}": ${matches.length} times`);
  matches.forEach((m, idx) => {
    const start = Math.max(0, m.index - 50);
    const end = Math.min(visibleText.length, m.index + phrase.length + 50);
    console.log(`   [${idx + 1}] ...${visibleText.slice(start, end).trim()}...`);
  });
}
