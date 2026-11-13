import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "../dist-server/entry-server.js";
import { productsData } from "../src/data/products.js";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = path.join(projectRoot, "dist");
const indexPath = path.join(distDirectory, "index.html");
const config = JSON.parse(
  await readFile(path.join(projectRoot, "site.config.json"), "utf8"),
);

const productionUrl = config.productionUrl.trim().replace(/\/$/, "");
const socialImagePath = config.socialImagePath.trim();
const baseHtml = await readFile(indexPath, "utf8");

const productRoutes = productsData.map((p) => ({
  path: `/products/${p.slug}`,
  outDir: path.join(distDirectory, "products", p.slug),
  outFile: path.join(distDirectory, "products", p.slug, "index.html"),
  altFile: path.join(distDirectory, "products", `${p.slug}.html`),
  title: p.title,
  description: p.description,
  product: p,
}));

const routes = [
  {
    path: "/",
    outFile: indexPath,
    title: "E-Rickshaw Spare Parts in Rohini, Delhi | JSR EV SPARE PARTS",
    description: "Looking for genuine e-rickshaw spare parts in Rohini, Delhi? Visit JSR EV SPARE PARTS for motors, controllers, brakes, batteries and accessories. Call 9990120067."
  },
  ...productRoutes,
  {
    path: "/privacy",
    outDir: path.join(distDirectory, "privacy"),
    outFile: path.join(distDirectory, "privacy", "index.html"),
    altFile: path.join(distDirectory, "privacy.html"),
    title: "Privacy Policy | JSR EV SPARE PARTS – Rohini, Delhi",
    description: "Privacy policy for JSR EV Spare Parts in Sector 18, Rohini, Delhi. Explains how customer enquiries, orders, and contact details are handled securely."
  },
  {
    path: "/terms",
    outDir: path.join(distDirectory, "terms"),
    outFile: path.join(distDirectory, "terms", "index.html"),
    altFile: path.join(distDirectory, "terms.html"),
    title: "Terms & Conditions | JSR EV SPARE PARTS – Rohini, Delhi",
    description: "Terms and conditions of sale, component compatibility checks, and in-shop repair services for JSR EV Spare Parts in Rohini, Delhi."
  },
  {
    path: "/refund",
    outDir: path.join(distDirectory, "refund"),
    outFile: path.join(distDirectory, "refund", "index.html"),
    altFile: path.join(distDirectory, "refund.html"),
    title: "Refund & Return Policy | JSR EV SPARE PARTS – Rohini, Delhi",
    description: "Return, exchange, and refund guidelines for electrical and mechanical e-rickshaw spare parts at JSR EV Spare Parts in Rohini, Delhi."
  },
  {
    path: "/404",
    outFile: path.join(distDirectory, "404.html"),
    title: "404 – Page Not Found | JSR EV SPARE PARTS",
    description: "The page you are looking for does not exist. Browse genuine e-rickshaw spare parts and repair services at JSR EV Spare Parts in Rohini, Delhi."
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
    
    // Update breadcrumbs for subpages & product category pages
    if (route.path !== "/404") {
      const pageNames = {
        "/privacy": "Privacy Policy",
        "/terms": "Terms & Conditions",
        "/refund": "Refund Policy"
      };
      const subpageName = pageNames[route.path] || route.product?.name || "Page";
      
      pageHtml = pageHtml.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/, (match, jsonContent) => {
        try {
          const schema = JSON.parse(jsonContent);
          if (schema['@graph'] && Array.isArray(schema['@graph'])) {
            const breadcrumbIndex = schema['@graph'].findIndex(item => item['@type'] === 'BreadcrumbList');
            
            const itemListElement = route.product
              ? [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": `${productionUrl}/`
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Spare Parts",
                    "item": `${productionUrl}/#spare-parts`
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": route.product.name,
                    "item": `${productionUrl}${route.path}`
                  }
                ]
              : [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": `${productionUrl}/`
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": subpageName,
                    "item": `${productionUrl}${route.path}`
                  }
                ];

            const newBreadcrumbs = {
              "@type": "BreadcrumbList",
              "@id": `${productionUrl}${route.path}#breadcrumb`,
              itemListElement
            };
            if (breadcrumbIndex !== -1) {
              schema['@graph'][breadcrumbIndex] = newBreadcrumbs;
            } else {
              schema['@graph'].push(newBreadcrumbs);
            }
            return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n  </script>`;
          }
        } catch (err) {
          console.error("Error updating subpage breadcrumbs JSON-LD:", err);
        }
        return match;
      });
    }
  }

  // 404 page must never be indexed by search engines
  if (route.path === "/404") {
    pageHtml = pageHtml.replace(/<meta name="robots" content=".*?" \/>/, '<meta name="robots" content="noindex, nofollow" />');
    pageHtml = pageHtml.replace(/<link rel="canonical" href=".*?" \/>\s*/, '');
    pageHtml = pageHtml.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '');
  }

  // Canonical and OG
  if (productionUrl && route.path !== "/404") {
    const canonicalUrl = route.path === "/" ? `${productionUrl}/` : `${productionUrl}${route.path}`;
    const socialImageUrl = route.product
      ? new URL(route.product.image, `${productionUrl}/`).href
      : (socialImagePath ? new URL(socialImagePath, `${productionUrl}/`).href : "");

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

// Valid XML Sitemap with reliable lastmod for actual public pages (no fake changefreq/priority)
const today = new Date().toISOString().split("T")[0];
const sitemapUrls = [
  "/",
  ...productsData.map(p => `/products/${p.slug}`),
  "/privacy",
  "/terms",
  "/refund"
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${productionUrl ? `${productionUrl}${u}` : u}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join("\n")}
</urlset>`.trim();

await writeFile(path.join(distDirectory, "sitemap.xml"), sitemapXml);
await writeFile(path.join(projectRoot, "public", "sitemap.xml"), sitemapXml);

const robotsTxt = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: ${productionUrl}/sitemap.xml
`;

await writeFile(path.join(distDirectory, "robots.txt"), robotsTxt);
await writeFile(path.join(projectRoot, "public", "robots.txt"), robotsTxt);
await writeFile(path.join(projectRoot, "..", "public", "robots.txt"), robotsTxt).catch(() => {});
await writeFile(path.join(projectRoot, "..", "public", "sitemap.xml"), sitemapXml).catch(() => {});

console.log("Prerender complete. Routes rendered:", routes.map(r => r.path).join(", "));
