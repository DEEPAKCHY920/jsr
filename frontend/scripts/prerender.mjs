import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "../dist-server/entry-server.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = path.join(projectRoot, "dist");
const indexPath = path.join(distDirectory, "index.html");
const config = JSON.parse(
  await readFile(path.join(projectRoot, "site.config.json"), "utf8"),
);

const productionUrl = config.productionUrl.trim().replace(/\/$/, "");
const socialImagePath = config.socialImagePath.trim();
let html = await readFile(indexPath, "utf8");

html = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);

if (productionUrl) {
  const socialImageUrl = socialImagePath
    ? new URL(socialImagePath, `${productionUrl}/`).href
    : "";
  const domainMetadata = [
    `<link rel="canonical" href="${productionUrl}/" />`,
    `<meta property="og:url" content="${productionUrl}/" />`,
    socialImageUrl ? `<meta property="og:image" content="${socialImageUrl}" />` : "",
    socialImageUrl ? `<meta name="twitter:image" content="${socialImageUrl}" />` : "",
  ]
    .filter(Boolean)
    .join("\n  ");

  html = html.replace("</head>", `  ${domainMetadata}\n</head>`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${productionUrl}/</loc></url>
</urlset>
`;
  await writeFile(path.join(distDirectory, "sitemap.xml"), sitemap);
}

const robots = productionUrl
  ? `User-agent: *\nAllow: /\n\nSitemap: ${productionUrl}/sitemap.xml\n`
  : "User-agent: *\nAllow: /\n";

await writeFile(indexPath, html);
await writeFile(path.join(distDirectory, "robots.txt"), robots);

