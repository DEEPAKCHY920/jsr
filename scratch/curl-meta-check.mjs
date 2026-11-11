import { readFile } from "node:fs/promises";

const html = await readFile("frontend/dist/index.html", "utf8");

console.log("=== CURL / JS-OFF HTML AUDIT ===");
console.log("Canonical:", html.match(/<link rel="canonical" href="(.*?)" \/>/)?.[1]);
console.log("Robots:", html.match(/<meta name="robots" content="(.*?)" \/>/)?.[1]);
console.log("OG Image:", html.match(/<meta property="og:image" content="(.*?)" \/>/)?.[1]);
console.log("OG Dimensions:", html.match(/<meta property="og:image:width" content="(.*?)" \/>/)?.[1] + "x" + html.match(/<meta property="og:image:height" content="(.*?)" \/>/)?.[1]);
console.log("Twitter Card:", html.match(/<meta name="twitter:card" content="(.*?)" \/>/)?.[1]);
console.log("HasMap in Schema:", html.match(/"hasMap":\s*"(.*?)"/)?.[1]);
console.log("Geo in Schema:", html.match(/"geo":\s*\{[\s\S]*?\}/)?.[0]?.replace(/\s+/g, ' '));
console.log("SameAs in Schema:", html.match(/"sameAs":\s*\[[\s\S]*?\]/)?.[0]?.replace(/\s+/g, ' '));
console.log("Opening Hours in Schema:", html.match(/"opens":\s*"08:00",\s*"closes":\s*"20:00"/)?.[0]);
console.log("Review Button Text:", html.includes("Leave us a Google review"));
console.log("Total JSON-LD schemas:", [...html.matchAll(/<script type="application\/ld\+json">/g)].length);

