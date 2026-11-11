import { readFile } from "node:fs/promises";
import path from "node:path";
import fs from "node:fs";

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (/\.(jsx|html)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getFiles("frontend/src").concat(["frontend/index.html"]);

for (const file of files) {
  const content = await readFile(file, "utf8");
  const imgMatches = [...content.matchAll(/<img[\s\S]*?>/g)];
  if (imgMatches.length) {
    console.log(`\nFile: ${file} (${imgMatches.length} images)`);
    imgMatches.forEach((m, i) => {
      const tag = m[0];
      const src = tag.match(/src=["']?([^"'\s>]+)/)?.[1] || "NONE";
      const alt = tag.match(/alt=["']?([^"'>]*)/)?.[1] || "NONE";
      const width = tag.match(/width=["']?([^"'\s>]+)/)?.[1] || "NONE";
      const height = tag.match(/height=["']?([^"'\s>]+)/)?.[1] || "NONE";
      console.log(` [${i+1}] src: ${src}`);
      console.log(`     alt: "${alt}"`);
      console.log(`     width: ${width}, height: ${height}`);
      if (alt === "NONE" || alt.trim() === "") console.warn("     WARNING: missing alt!");
      if (width === "NONE" || height === "NONE") console.warn("     WARNING: missing width or height!");
    });
  }
}

