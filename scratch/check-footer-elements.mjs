import cp from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';

const p = 9290;
const chrome = cp.spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=' + p,
  '--user-data-dir=C:/Users/techn/AppData/Local/Temp/chrome-crop-vis-' + Date.now(),
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
}).listen(4215, '127.0.0.1');

await send('Page.navigate', { url: 'http://127.0.0.1:4215/' });
await new Promise(r => setTimeout(r, 800));
await send('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight)' });
await new Promise(r => setTimeout(r, 400));

const elements = await send('Runtime.evaluate', { expression: `(() => {
  const f = document.querySelector(".site-footer");
  const b = f.getBoundingClientRect();
  const res = [];
  document.querySelectorAll(".site-footer *").forEach(el => {
    const text = el.innerText ? el.innerText.trim() : "";
    if (text && el.children.length === 0) {
      const r = el.getBoundingClientRect();
      res.push({
        text: text.slice(0, 30),
        tag: el.tagName,
        top: Math.round(r.top),
        bottom: Math.round(r.bottom),
        left: Math.round(r.left),
        height: Math.round(r.height)
      });
    }
  });
  return { footerTop: Math.round(b.top), footerBottom: Math.round(b.bottom), elements: res };
})()`, returnByValue: true });

console.log('Visible elements in footer:', JSON.stringify(elements.result.value, null, 2));

ws.close();
chrome.kill();
s.close();

