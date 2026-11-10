import fs from "node:fs";

const html = fs.readFileSync("frontend/dist/index.html", "utf8");

console.log("=== JSON-LD IN dist/index.html ===");
const jsonMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (jsonMatch) {
  console.log(jsonMatch[1].trim());
}

console.log("\n=== EXTERNAL LINKS IN dist/index.html ===");
const linkMatches = [...html.matchAll(/<a\s+[^>]*?href="(https?:\/\/[^"]+)"[^>]*?>/g)];
console.log("Total external links count:", linkMatches.length);
linkMatches.forEach(m => {
  const tag = m[0];
  const href = m[1];
  const ariaLabelMatch = tag.match(/aria-label="([^"]+)"/);
  console.log({
    href,
    targetBlank: tag.includes('target="_blank"'),
    noopener: tag.includes('rel="noopener noreferrer"'),
    ariaLabel: ariaLabelMatch ? ariaLabelMatch[1] : null
  });
});

