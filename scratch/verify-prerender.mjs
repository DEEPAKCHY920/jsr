import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const projectRoot = path.resolve("frontend");
const indexPath = path.join(projectRoot, "dist", "index.html");
const html = fs.readFileSync(indexPath, "utf8");
const rawBytes = Buffer.byteLength(html, "utf8");
const gzipped = zlib.gzipSync(Buffer.from(html), { level: 9 });
const brotlied = zlib.brotliCompressSync(Buffer.from(html), {
  params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 }
});

console.log("--- TRANSFER SIZE OF dist/index.html ---");
console.log("Raw HTML size:", rawBytes, "bytes (" + (rawBytes / 1024).toFixed(2) + " KB)");
console.log("Gzip (level 9):", gzipped.length, "bytes (" + (gzipped.length / 1024).toFixed(2) + " KB)");
console.log("Brotli (quality 11):", brotlied.length, "bytes (" + (brotlied.length / 1024).toFixed(2) + " KB)");

console.log("\n--- VERIFICATION CHECKS (JS DISABLED) ---");
const checks = [
  ["H1 heading ('Your Destination for' & 'E-Rickshaw Spare Parts')", html.includes("Your Destination for") && html.includes("E-Rickshaw Spare Parts")],
  ["Phone (+91 9990120067)", html.includes("+91 9990120067")],
  ["Address (Sector 18, Rohini, Delhi)", html.includes("Sector 18, Rohini, Delhi")],
  ["Hours (8:00 AM – 8:00 PM)", html.includes("8:00 AM") && html.includes("8:00 PM")],
  ["FAQ Q1 (Where is JSR EV Spare Parts located in Rohini?)", html.includes("Where is JSR EV Spare Parts located in Rohini?")],
  ["FAQ Q2 (Which electric vehicle spare parts do you sell?)", html.includes("Which electric vehicle spare parts do you sell?")],
  ["FAQ Q3 (Do you provide repair and fitting services at the shop?)", html.includes("Do you provide repair and fitting services at the shop?")],
  ["FAQ Q4 (What are your shop timings?)", html.includes("What are your shop timings?")],
  ["FAQ Q5 (How can I check if a spare part is currently in stock?)", html.includes("How can I check if a spare part is currently in stock?")],
  ["Privacy Policy link (/privacy)", html.includes('href="/privacy"')],
  ["Terms & Conditions link (/terms)", html.includes('href="/terms"')],
  ["Refund Policy link (/refund)", html.includes('href="/refund"')],
];

checks.forEach(([label, pass]) => {
  console.log((pass ? "PASS: " : "FAIL: ") + label);
});
