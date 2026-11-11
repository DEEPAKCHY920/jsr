import { readFile } from "node:fs/promises";

const html = await readFile("frontend/dist/index.html", "utf8");

const required = [
  "Your Destination for", // H1 prefix
  "E-Rickshaw Spare Parts", // H1 highlight
  "+91 9990120067",
  "Sector 18, Near Data Ram Apartment",
  "8:00 AM – 8:00 PM",
  "Where is JSR EV Spare Parts located in Rohini?",
  "Which electric vehicle spare parts do you sell?",
  "Do you provide repair and fitting services at the shop?",
  "What are your shop timings?",
  "How can I check if a spare part is currently in stock?",
  "Where can I buy e-rickshaw spare parts in Rohini?",
  "Which electric scooter parts do you stock?",
  "Do you offer e-rickshaw motor repair in Delhi?",
  "Do you supply complete battery packs and chargers?",
  "ई-रिक्शा और इलेक्ट्रिक स्कूटर स्पेयर पार्ट्स – सेक्टर 18, रोहिणी, दिल्ली"
];

let allPassed = true;
for (const item of required) {
  if (html.includes(item)) {
    console.log(`[PASS] Found: "${item}"`);
  } else {
    console.error(`[FAIL] Missing: "${item}"`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log("\nALL CURL / JS-OFF PRERENDER CHECKS PASSED!");
} else {
  process.exit(1);
}
