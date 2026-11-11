import { readFile, writeFile } from "node:fs/promises";

const faqContent = await readFile("frontend/src/FAQ.jsx", "utf8");
const match = faqContent.match(/export const faqItems = (\[[\s\S]*?\]);/);
if (!match) {
  console.error("Could not parse faqItems from FAQ.jsx");
  process.exit(1);
}

// Safely evaluate faqItems array
const faqItems = eval(match[1]);

const indexPath = "frontend/index.html";
let html = await readFile(indexPath, "utf8");

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
};

const formattedJson = JSON.stringify(faqSchema, null, 2)
  .split("\n")
  .map(line => "    " + line)
  .join("\n")
  .trim();

const reg = /<script type="application\/ld\+json">\s*\{\s*"@context":\s*"https:\/\/schema\.org",\s*"@type":\s*"FAQPage"[\s\S]*?<\/script>/;

const newScript = `<script type="application/ld+json">\n    ${formattedJson}\n  </script>`;

if (reg.test(html)) {
  html = html.replace(reg, newScript);
  await writeFile(indexPath, html);
  console.log("Updated FAQPage schema in frontend/index.html successfully!");
} else {
  console.error("Could not find FAQPage script in frontend/index.html");
}
