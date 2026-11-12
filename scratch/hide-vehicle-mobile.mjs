import fs from 'fs';

let css = fs.readFileSync('frontend/style.css', 'utf8');

// Replace .stock-parts__vehicle-col inside @media (max-width: 1080px)
css = css.replace(
  /\.stock-parts__vehicle-col\s*\{\s*width:\s*100%;\s*max-width:\s*260px;\s*margin-top:\s*6px;\s*\}/,
  '.stock-parts__vehicle-col {\n    display: none;\n  }'
);

// Remove .stock-parts__vehicle-col inside 600px and 440px media queries
css = css.replace(
  /\s*\.stock-parts__vehicle-col\s*\{\s*max-width:\s*220px;\s*\}/,
  ''
);

css = css.replace(
  /\s*\.stock-parts__vehicle-col\s*\{\s*max-width:\s*190px;\s*\}/,
  ''
);

fs.writeFileSync('frontend/style.css', css, 'utf8');
console.log('Successfully updated frontend/style.css to hide vehicle on mobile');

