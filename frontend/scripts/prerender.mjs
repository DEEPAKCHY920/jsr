import { mkdir, readFile, writeFile } from "node:fs/promises";
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
const baseHtml = await readFile(indexPath, "utf8");

const routes = [
  {
    path: "/",
    outFile: indexPath,
    title: "JSR EV SPARE PARTS – E-Rickshaw & Scooter Spare Parts in Rohini, Delhi",
    description: "Wholesale & retail supplier of genuine e-rickshaw and scooter spare parts in Sector 18, Rohini, Delhi. Motor, controller, throttle, battery charger & repair services. Open every day."
  },
  {
    path: "/privacy",
    outDir: path.join(distDirectory, "privacy"),
    outFile: path.join(distDirectory, "privacy", "index.html"),
    altFile: path.join(distDirectory, "privacy.html"),
    title: "Privacy Policy | JSR EV Spare Parts",
    description: "Privacy policy for JSR EV Spare Parts, Sector 18, Rohini, Delhi. Explains how customer enquiries, orders, and contact details are handled."
  },
  {
    path: "/terms",
    outDir: path.join(distDirectory, "terms"),
    outFile: path.join(distDirectory, "terms", "index.html"),
    altFile: path.join(distDirectory, "terms.html"),
    title: "Terms & Conditions | JSR EV Spare Parts",
    description: "Terms and conditions of sale, compatibility checks, and repair services for JSR EV Spare Parts in Rohini, Delhi."
  },
  {
    path: "/refund",
    outDir: path.join(distDirectory, "refund"),
    outFile: path.join(distDirectory, "refund", "index.html"),
    altFile: path.join(distDirectory, "refund.html"),
    title: "Refund & Return Policy | JSR EV Spare Parts",
    description: "Return, exchange, and refund guidelines for electrical and mechanical e-rickshaw spare parts at JSR EV Spare Parts."
  },
  {
    path: "/404",
    outFile: path.join(distDirectory, "404.html"),
    title: "404 – Page Not Found | JSR EV Spare Parts",
    description: "The page you are looking for does not exist. Browse our genuine EV spare parts in Rohini, Delhi."
  }
];

for (const route of routes) {
  let pageHtml = baseHtml.replace('<div id="root"></div>', `<div id="root">${render(route.path)}</div>`);

  // Update title & description if specialized
  if (route.title) {
    pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`);
  }
  if (route.description) {
    pageHtml = pageHtml.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.description}" />`);
  }

  // Remove FAQPage schema from non-homepage routes as FAQs only exist on "/"
  if (route.path !== "/") {
    pageHtml = pageHtml.replace(/<script type="application\/ld\+json">\s*\{\s*"@context":\s*"https:\/\/schema\.org",\s*"@type":\s*"FAQPage"[\s\S]*?<\/script>\s*/, "");
  }

  // Canonical and OG
  if (productionUrl) {
    const canonicalUrl = route.path === "/" ? `${productionUrl}/` : `${productionUrl}${route.path}`;
    const socialImageUrl = socialImagePath ? new URL(socialImagePath, `${productionUrl}/`).href : "";

    // Update or insert canonical
    if (pageHtml.includes('<link rel="canonical"')) {
      pageHtml = pageHtml.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
    } else {
      pageHtml = pageHtml.replace("</head>", `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
    }

    // Update or insert og:url
    if (pageHtml.includes('<meta property="og:url"')) {
      pageHtml = pageHtml.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);
    } else {
      pageHtml = pageHtml.replace("</head>", `  <meta property="og:url" content="${canonicalUrl}" />\n</head>`);
    }

    // Update og:title & og:description if route has custom title/description
    if (route.title) {
      pageHtml = pageHtml.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${route.title}" />`);
      pageHtml = pageHtml.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${route.title}" />`);
    }
    if (route.description) {
      pageHtml = pageHtml.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${route.description}" />`);
      pageHtml = pageHtml.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${route.description}" />`);
    }

    // Update or insert og:image & twitter:image
    if (socialImageUrl) {
      if (pageHtml.includes('<meta property="og:image"')) {
        pageHtml = pageHtml.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${socialImageUrl}" />`);
      } else {
        pageHtml = pageHtml.replace("</head>", `  <meta property="og:image" content="${socialImageUrl}" />\n</head>`);
      }
      if (pageHtml.includes('<meta name="twitter:image"')) {
        pageHtml = pageHtml.replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${socialImageUrl}" />`);
      } else {
        pageHtml = pageHtml.replace("</head>", `  <meta name="twitter:image" content="${socialImageUrl}" />\n</head>`);
      }
    }
  }

  if (route.outDir) {
    await mkdir(route.outDir, { recursive: true });
  }

  await writeFile(route.outFile, pageHtml);
  if (route.altFile) {
    await writeFile(route.altFile, pageHtml);
  }
}

// Sitemap
const sitemapUrls = [
  "",
  "/privacy",
  "/terms",
  "/refund"
];

const sitemapLocs = productionUrl
  ? sitemapUrls.map(u => `  <url><loc>${productionUrl}${u ? u : "/"}</loc></url>`).join("\n")
  : `  <url><loc>/</loc></url>\n  <url><loc>/privacy</loc></url>\n  <url><loc>/terms</loc></url>\n  <url><loc>/refund</loc></url>`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapLocs}
</urlset>
`;
await writeFile(path.join(distDirectory, "sitemap.xml"), sitemap);

const robots = productionUrl
  ? `User-agent: *\nAllow: /\n\nSitemap: ${productionUrl}/sitemap.xml\n`
  : "User-agent: *\nAllow: /\n\nSitemap: /sitemap.xml\n";

await writeFile(path.join(distDirectory, "robots.txt"), robots);

console.log("Prerender complete. Routes rendered:", routes.map(r => r.path).join(", "));
