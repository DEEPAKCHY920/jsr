import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import http from "node:http";

const preview = spawn("npx", ["vite", "preview", "--port", "4174", "--strictPort"], {
  cwd: "frontend",
  shell: true,
  stdio: "pipe"
});

async function waitForServer() {
  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get("http://localhost:4174", (res) => {
          if (res.statusCode === 200) resolve(true);
          else reject(new Error(`Status ${res.statusCode}`));
        });
        req.on("error", reject);
      });
      return true;
    } catch (e) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
}

await waitForServer();

const lh = spawn("npx", [
  "--yes",
  "lighthouse",
  "http://localhost:4174",
  "--form-factor=mobile",
  "--screenEmulation.mobile=true",
  "--output=json",
  "--output-path=scratch/lh-full-mobile.json",
  "--chrome-flags=--headless=new",
  "--quiet"
], {
  cwd: ".",
  shell: true,
  stdio: "inherit"
});

lh.on("close", async (code) => {
  preview.kill();
  if (code === 0) {
    const data = JSON.parse(await readFile("scratch/lh-full-mobile.json", "utf8"));
    const cats = data.categories;
    console.log("\n=== FULL LIGHTHOUSE SCORES (MOBILE) ===");
    console.log("Performance:", Math.round(cats.performance.score * 100));
    console.log("Accessibility:", Math.round(cats.accessibility.score * 100));
    console.log("Best Practices:", Math.round(cats["best-practices"].score * 100));
    console.log("SEO:", Math.round(cats.seo.score * 100));
    console.log("\n=== CORE WEB VITALS ===");
    console.log("CLS (Cumulative Layout Shift):", data.audits["cumulative-layout-shift"]?.numericValue, `(${data.audits["cumulative-layout-shift"]?.displayValue})`);
    console.log("FCP:", data.audits["first-contentful-paint"]?.displayValue);
    console.log("LCP:", data.audits["largest-contentful-paint"]?.displayValue);
    console.log("TBT:", data.audits["total-blocking-time"]?.displayValue);
  }
  process.exit(code);
});

