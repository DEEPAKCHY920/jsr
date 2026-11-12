import fs from 'fs';
import path from 'path';

const src = 'C:/Users/techn/.gemini/antigravity/brain/b004bd44-88a2-4f25-ac96-38233a3ae9d5/.user_uploaded/media_1794499298251_9b659992.jpg';
const destJpg = 'd:/jsr/frontend/public/footer-rickshaw-bg.jpg';
const destWebp = 'd:/jsr/frontend/public/footer-rickshaw-bg.webp';

fs.copyFileSync(src, destJpg);
console.log('Copied to', destJpg);

