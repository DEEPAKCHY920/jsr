import fs from "node:fs";

let css = fs.readFileSync("frontend/style.css", "utf8");

css = css.replace(/(\.stats-strip__inner\s*\{[^}]*?gap:\s*)24px;/s, "$116px;");

const mobileReplacement = `@media (min-width: 769px) and (max-width: 1024px) {
  .stats-strip__inner {
    gap: 10px;
  }
  .stats-strip__number {
    font-size: var(--fs-xl);
  }
  .stats-strip__label {
    font-size: var(--fs-sm);
  }
}

@media (max-width: 768px) {
  .stats-strip {
    padding: 34px 0 38px;
  }
  .stats-strip__inner {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 14px;
    align-items: start;
  }
  .stats-strip__divider {
    display: none;
  }
  .stats-strip__item:last-child:nth-child(odd) {
    grid-column: span 2;
  }
  .stats-strip__number {
    font-size: var(--fs-xl);
    min-height: 34px;
  }
  .stats-strip__label {
    font-size: var(--fs-sm);
    min-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 6px 0 3px;
  }
  .stats-strip__sub {
    font-size: var(--fs-sm);
    min-height: 24px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    text-align: center;
    line-height: 1.35;
  }
}`;

css = css.replace(/@media\s*\(max-width:\s*768px\)\s*\{\s*\.stats-strip\s*\{[\s\S]*?\}\s*\}\s*\}/, mobileReplacement);

fs.writeFileSync("frontend/style.css", css);
console.log("Updated style.css stats-strip styles");

