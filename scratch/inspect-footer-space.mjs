import cp from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';

const p = 9270;
const chrome = cp.spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=' + p,
  '--user-data-dir=C:/Users/techn/AppData/Local/Temp/chrome-space-' + Date.now(),
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
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });

const s = http.createServer((q, res) => {
  let p = q.url.split('?')[0];
  if (p === '/') p = '/index.html';
  const f = 'd:/jsr/frontend/dist' + p;
  if (fs.existsSync(f)) {
    res.writeHead(200);
    fs.createReadStream(f).pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(4205, '127.0.0.1');

await send('Page.navigate', { url: 'http://127.0.0.1:4205/' });
await new Promise(r => setTimeout(r, 800));
await send('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight)' });
await new Promise(r => setTimeout(r, 400));

const data = await send('Runtime.evaluate', { expression: `(() => {
  const f = document.querySelector(".site-footer");
  const inner = document.querySelector(".site-footer__inner");
  const grid = document.querySelector(".site-footer__grid");
  const b = document.querySelector(".site-footer__bottom");
  return {
    footerHeight: f.offsetHeight,
    innerHeight: inner.offsetHeight,
    gridHeight: grid.offsetHeight,
    bottomHeight: b.offsetHeight,
    padding: window.getComputedStyle(f).padding,
    minHeight: window.getComputedStyle(f).minHeight,
    innerGap: window.getComputedStyle(inner).gap,
    innerMargin: window.getComputedStyle(inner).margin,
    spaceBelowBottom: f.offsetHeight - (inner.offsetTop + inner.offsetHeight),
    bottomRect: b.getBoundingClientRect(),
    footerRect: f.getBoundingClientRect()
  };
})()`, returnByValue: true });

console.log('Footer dimensions:', JSON.stringify(data.result.value, null, 2));

const clip = await send('Runtime.evaluate', { expression: `(() => {
  const r = document.querySelector(".site-footer").getBoundingClientRect();
  return { x: r.left, y: r.top + window.scrollY, width: r.width, height: r.height };
})()`, returnByValue: true });

const shot = await send('Page.captureScreenshot', { format: 'png', clip: { ...clip.result.value, scale: 1 } });
fs.writeFileSync('scratch/footer-current-desktop.png', Buffer.from(shot.data, 'base64'));

ws.close();
chrome.kill();
s.close();

