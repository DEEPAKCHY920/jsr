import cp from 'node:child_process';
import fs from 'node:fs';

const p = 9285;
const chrome = cp.spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=' + p,
  '--user-data-dir=C:/Users/techn/AppData/Local/Temp/chrome-crop-' + Date.now(),
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
const html = `<html><body style="margin:0;background:black;"><img id="i" src="data:image/png;base64,${userImgBase64}" style="width:1024px;height:86px;display:block;"/></body></html>`;
await send('Page.navigate', { url: 'data:text/html;base64,' + Buffer.from(html).toString('base64') });
await new Promise(r => setTimeout(r, 500));
const shot = await send('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync('scratch/user-img-preview.png', Buffer.from(shot.data, 'base64'));
console.log('Saved scratch/user-img-preview.png');
ws.close();
chrome.kill();

