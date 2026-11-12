import cp from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';

const p = 9280;
const chrome = cp.spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=' + p,
  '--user-data-dir=C:/Users/techn/AppData/Local/Temp/chrome-analyze-' + Date.now(),
  'about:blank'
]);

await new Promise(r => setTimeout(r, 1200));
const l = await fetch('http://127.0.0.1:' + p + '/json/list').then(r => r.json());
const ws = new WebSocket(l[0].webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);

let id = 1;
const send = (m, params = {}) => new Promise(res => {
  const mid = id++;
  const handler = (e) => {
    const d = JSON.parse(e.data);
    if (d.id === mid) { ws.removeEventListener('message', handler); res(d.result); }
  };
  ws.addEventListener('message', handler);
  ws.send(JSON.stringify({ id: mid, method: m, params }));
});

await send('Page.enable');

const userImgBase64 = fs.readFileSync('C:/Users/techn/.gemini/antigravity/brain/b004bd44-88a2-4f25-ac96-38233a3ae9d5/.user_uploaded/media_1794503755818_253f94a3.png').toString('base64');

// We load an HTML page with the image on canvas and sample pixels
const html = `
<!DOCTYPE html>
<html>
<body>
<img id="img" src="data:image/png;base64,${userImgBase64}" />
<canvas id="c"></canvas>
<script>
window.onload = () => {
  const img = document.getElementById('img');
  const c = document.getElementById('c');
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  window.ready = true;
};
</script>
</body>
</html>
`;

await send('Page.navigate', { url: 'data:text/html;base64,' + Buffer.from(html).toString('base64') });
await new Promise(r => setTimeout(r, 800));

const analysis = await send('Runtime.evaluate', { expression: `(() => {
  const c = document.getElementById('c');
  const ctx = c.getContext('2d');
  const w = c.width;
  const h = c.height;

  // Let's sample rows from top to bottom
  const rowBrightnesses = [];
  for (let y = 0; y < h; y += 4) {
    const data = ctx.getImageData(0, y, w, 1).data;
    let sum = 0;
    for (let x = 0; x < w * 4; x += 4) {
      sum += (data[x] + data[x+1] + data[x+2]) / 3;
    }
    rowBrightnesses.push({ y, avg: Math.round(sum / w) });
  }

  // Check bottom 30px
  const bottomSlice = [];
  for (let y = h - 25; y < h; y += 2) {
    const data = ctx.getImageData(0, y, w, 1).data;
    let nonDark = 0;
    for (let x = 0; x < w * 4; x += 4) {
      if (data[x] > 40 || data[x+1] > 40 || data[x+2] > 40) nonDark++;
    }
    bottomSlice.push({ y, nonDarkPct: Math.round((nonDark / w) * 100) });
  }

  return { w, h, rowBrightnesses, bottomSlice };
})()`, returnByValue: true });

console.log('User image analysis:', JSON.stringify(analysis.result.value, null, 2));

ws.close();
chrome.kill();

