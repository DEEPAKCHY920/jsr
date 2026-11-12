import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import http from "node:http";

// Start static preview server on 4173
const preview = spawn("npx", ["vite", "preview", "--port", "4173", "--strictPort"], {
  cwd: "frontend",
  shell: true,
  stdio: "pipe"
});

preview.stdout.on("data", (d) => console.log(`[Preview] ${d.toString().trim()}`));
preview.stderr.on("data", (d) => console.error(`[Preview Err] ${d.toString().trim()}`));

// Wait for server to be responsive
async function waitForServer() {
  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get("http://localhost:4173", (res) => {
          if (res.statusCode === 200) resolve(true);
          else reject(new Error(`Status ${res.statusCode}`));
        });
        req.on("error", reject);
      });
      console.log("Preview server is live!");
      return true;
    } catch (e) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  throw new Error("Server did not become ready");
}

await waitForServer();

// Run Lighthouse Mobile
console.log("Running Lighthouse Mobile audit...");
const lh = spawn("npx", [
  "--yes",
  "lighthouse",
  "http://localhost:4173",
  "--preset=perf",
  "--form-factor=mobile",
  "--screenEmulation.mobile=true",
  "--output=json",
  "--output-path=scratch/lh-mobile.json",
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
    try {
      const data = JSON.parse(await readFile("scratch/lh-mobile.json", "utf8"));
      const cats = data.categories;
      console.log("\n=== LIGHTHOUSE SCORES (MOBILE) ===");
      console.log("Performance:", Math.round(cats.performance.score * 100));
      console.log("Accessibility:", Math.round(cats.accessibility?.score * 100));
      console.log("Best Practices:", Math.round(cats["best-practices"]?.score * 100));
      console.log("SEO:", Math.round(cats.seo?.score * 100));
      console.log("\n=== CORE WEB VITALS ===");
      console.log("FCP:", data.audits["first-contentful-paint"]?.displayValue);
      console.log("LCP:", data.audits["largest-contentful-paint"]?.displayValue);
      console.log("CLS:", data.audits["cumulative-layout-shift"]?.displayValue);
      console.log("TBT:", data.audits["total-blocking-time"]?.displayValue);
    } catch (err) {
      console.error("Error reading report:", err);
    }
  } else {
    console.error(`Lighthouse exited with code ${code}`);
  }
  process.exit(code);
});

