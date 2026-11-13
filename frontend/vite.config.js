import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    // Explicit middleware to serve sitemap.xml and robots.txt strictly as static XML/plain text,
    // ensuring no Vite HTML transformation, script injection, or CSS fragments are appended.
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const cleanUrl = (req.url || "").split("?")[0];
        if (cleanUrl === "/sitemap.xml") {
          const sitemapPath = path.resolve(__dirname, "public/sitemap.xml");
          if (fs.existsSync(sitemapPath)) {
            const sitemapContent = fs.readFileSync(sitemapPath, "utf8").trim();
            res.setHeader("Content-Type", "application/xml; charset=utf-8");
            res.setHeader("X-Content-Type-Options", "nosniff");
            res.setHeader("Cache-Control", "no-cache");
            res.statusCode = 200;
            return res.end(sitemapContent);
          }
        }
        if (cleanUrl === "/robots.txt") {
          const robotsPath = path.resolve(__dirname, "public/robots.txt");
          if (fs.existsSync(robotsPath)) {
            const robotsContent = fs.readFileSync(robotsPath, "utf8").trim();
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.setHeader("X-Content-Type-Options", "nosniff");
            res.setHeader("Cache-Control", "no-cache");
            res.statusCode = 200;
            return res.end(robotsContent);
          }
        }
        next();
      });
    }
  }
});

