import fs from 'fs';

const p = 'C:/Users/techn/.gemini/antigravity/brain/b004bd44-88a2-4f25-ac96-38233a3ae9d5/.user_uploaded/media_1794503755818_253f94a3.png';
const buf = fs.readFileSync(p);

// Let's use Jimp or canvas if available, or write a tiny BMP/ppm or inspect chunks
console.log('PNG size:', buf.length);

