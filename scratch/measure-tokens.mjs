import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const projectRoot = path.resolve("frontend");
const distDir = path.join(projectRoot, "dist");

// Simple static server
const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url === "/" ? "index.html" : req.url);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, "index.html");
  }
  const ext = path.extname(filePath);
  const types = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".webp": "image/webp",
    ".json": "application/json"
  };
  res.writeHead(200, { "Content-Type": types[ext] || "text/plain" });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(4173, async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto("http://localhost:4173", { waitUntil: "networkidle0" });

    const results = await page.evaluate(() => {
      const count = (prop) => {
        const m = {};
        document.querySelectorAll('body *').forEach(el => {
          // Ignore SVG inner elements that inherit or don't render visible text
          const v = getComputedStyle(el)[prop];
          m[v] = (m[v] || 0) + 1;
        });
        return Object.entries(m).sort((a, b) => b[1] - a[1]);
      };

      return {
        fontSize: count('fontSize'),
        color: count('color'),
        borderTopLeftRadius: count('borderTopLeftRadius'),
      };
    });

    console.log("=== CURRENT MEASUREMENT (BEFORE TOKEN APPLICATION) ===");
    console.log("Font Sizes Count:", results.fontSize.length);
    console.table(results.fontSize);
    console.log("Colors Count:", results.color.length);
    console.table(results.color);
    console.log("Border Top Left Radius Count:", results.borderTopLeftRadius.length);
    console.table(results.borderTopLeftRadius);

    fs.writeFileSync("scratch/tokens-before.json", JSON.stringify(results, null, 2));
  } finally {
    await browser.close();
    server.close();
  }
});

