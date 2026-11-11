import { readFile } from "node:fs/promises";
import path from "node:path";
import fs from "node:fs";

const pages = [
  "frontend/dist/index.html",
  "frontend/dist/privacy/index.html",
  "frontend/dist/terms/index.html",
  "frontend/dist/refund/index.html",
  "frontend/dist/404.html"
];

for (const p of pages) {
  if (!fs.existsSync(p)) continue;
  const content = await readFile(p, "utf8");
  // Find all hrefs
  const matches = [...content.matchAll(/href=["']([^"']+)["']/g)];
  console.log(`\nAuditing links in ${p} (${matches.length} links):`);
  const checked = new Set();
  for (const m of matches) {
    const href = m[1];
    if (checked.has(href)) continue;
    checked.add(href);

    if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("javascript:")) {
      // External or protocol link
      continue;
    }

    if (href.startsWith("#")) {
      // Anchor link
      const id = href.slice(1);
      const exists = content.includes(`id="${id}"`);
      if (!exists) {
        console.warn(` [BROKEN ANCHOR] in ${p}: ${href} (id "${id}" not found in page)`);
      }
    } else if (href.startsWith("/")) {
      // Internal path
      const cleanPath = href.split("#")[0].split("?")[0];
      const anchor = href.split("#")[1];
      
      let targetFile;
      const withoutSlash = cleanPath.replace(/^\//, "");
      const directFile = path.join("frontend/dist", withoutSlash);
      if (fs.existsSync(directFile) && !fs.statSync(directFile).isDirectory()) {
        targetFile = directFile;
      } else if (cleanPath === "/" || cleanPath === "") {
        targetFile = "frontend/dist/index.html";
      } else {
        targetFile = path.join("frontend/dist", withoutSlash, "index.html");
        if (!fs.existsSync(targetFile)) {
          targetFile = path.join("frontend/dist", withoutSlash + ".html");
        }
      }

      if (!fs.existsSync(targetFile)) {
        console.warn(` [BROKEN LINK] in ${p}: ${href} -> target file ${targetFile} does not exist!`);
      } else if (anchor) {
        const targetContent = await readFile(targetFile, "utf8");
        if (!targetContent.includes(`id="${anchor}"`)) {
          console.warn(` [BROKEN ANCHOR ON TARGET] in ${p}: ${href} -> id "${anchor}" not in ${targetFile}`);
        }
      }
    }
  }
}
console.log("\nLink audit complete.");
