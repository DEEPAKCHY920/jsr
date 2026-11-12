import cp from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';

const p = 9275;
const chrome = cp.spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new',
  '--remote-debugging-port=' + p,
  '--user-data-dir=C:/Users/techn/AppData/Local/Temp/chrome-pos-' + Date.now(),
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
}).listen(4210, '127.0.0.1');

await send('Page.navigate', { url: 'http://127.0.0.1:4210/' });
await new Promise(r => setTimeout(r, 800));
await send('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight)' });
await new Promise(r => setTimeout(r, 400));

const pos = await send('Runtime.evaluate', { expression: `(() => {
  const f = document.querySelector(".site-footer");
  const bg = document.querySelector(".site-footer__bg-vehicle");
  const inner = document.querySelector(".site-footer__inner");
  const grid = document.querySelector(".site-footer__grid");
  const bottom = document.querySelector(".site-footer__bottom");

  function r(el) {
    const b = el.getBoundingClientRect();
    return { top: Math.round(b.top), bottom: Math.round(b.bottom), height: Math.round(b.height) };
  }

  return {
    footer: r(f),
    bgVehicle: r(bg),
    inner: r(inner),
    grid: r(grid),
    bottom: r(bottom),
    footerPadding: window.getComputedStyle(f).padding,
    footerMinHeight: window.getComputedStyle(f).minHeight,
    innerGap: window.getComputedStyle(inner).gap,
    bottomPaddingTop: window.getComputedStyle(bottom).paddingTop,
    bottomGap: window.getComputedStyle(bottom).gap
  };
})()`, returnByValue: true });

console.log('Positions on Desktop 1440px:', JSON.stringify(pos.result.value, null, 2));

ws.close();
chrome.kill();
s.close();

