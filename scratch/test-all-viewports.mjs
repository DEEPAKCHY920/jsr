import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const distDir = 'd:/jsr/frontend/dist';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(distDir, reqPath);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(distDir, 'index.html')).pipe(res);
  }
});

const serverPort = 4192;
server.listen(serverPort, '127.0.0.1', async () => {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const userDataDir = 'C:/Users/techn/AppData/Local/Temp/chrome-viewports-' + Date.now();
  const cdpPort = 9255;

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${cdpPort}`,
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    'about:blank'
  ], { stdio: 'ignore' });

  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${cdpPort}/json/version`);
      if (res.ok) break;
    } catch {}
    await new Promise(r => setTimeout(r, 100));
  }

  const listRes = await fetch(`http://127.0.0.1:${cdpPort}/json/list`);
  const pages = await listRes.json();
  const wsUrl = pages[0].webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);

  let id = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  await new Promise(r => ws.onopen = r);

  await send('Page.enable');
  await send('DOM.enable');

  const viewports = [320, 360, 375, 390, 414, 480, 768, 820, 1024, 1280, 1440, 1920];
  const results = [];

  for (const width of viewports) {
    const height = 900;
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: width < 1024
    });

    await send('Page.navigate', { url: `http://127.0.0.1:${serverPort}/` });
    await new Promise(r => setTimeout(r, 600));

    // Scroll down to the footer
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, document.body.scrollHeight);`
    });
    await new Promise(r => setTimeout(r, 300));

    const checkRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientWidth = docEl.clientWidth;
          const hasHorizontalOverflow = scrollWidth > clientWidth;

          // Find overflowing elements if any
          const overflowing = [];
          document.querySelectorAll('*').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > clientWidth + 1 || rect.left < -1) {
              overflowing.push({
                tag: el.tagName,
                cls: el.className,
                left: rect.left,
                right: rect.right,
                width: rect.width
              });
            }
          });

          // Check footer specifics
          const footer = document.querySelector('.site-footer');
          const footerRect = footer ? footer.getBoundingClientRect() : null;

          const cards = Array.from(document.querySelectorAll('.site-footer__highlight-item')).map(c => {
            const r = c.getBoundingClientRect();
            return { width: r.width, height: r.height, top: r.top, left: r.left };
          });

          const wa = document.querySelector('.whatsapp-float');
          const waRect = wa ? wa.getBoundingClientRect() : null;

          const btt = document.querySelector('.back-to-top');
          const bttRect = btt ? btt.getBoundingClientRect() : null;

          return {
            width: ${width},
            clientWidth,
            scrollWidth,
            hasHorizontalOverflow,
            overflowCount: overflowing.length,
            overflowDetails: overflowing.slice(0, 3),
            cardsCount: cards.length,
            cardWidths: cards.map(c => Math.round(c.width)),
            cardHeights: cards.map(c => Math.round(c.height)),
            waVisible: waRect ? (waRect.width > 0 && waRect.height > 0) : false,
            waSize: waRect ? { w: Math.round(waRect.width), h: Math.round(waRect.height) } : null,
            bttSize: bttRect ? { w: Math.round(bttRect.width), h: Math.round(bttRect.height) } : null
          };
        })()
      `,
      returnByValue: true
    });

    results.push(checkRes.result.value);

    // Capture screenshot for representative viewports
    if ([360, 768, 1024, 1440].includes(width)) {
      const clipRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const f = document.querySelector('.site-footer');
            const r = f.getBoundingClientRect();
            return {
              x: Math.max(0, r.left),
              y: Math.max(0, r.top + window.scrollY),
              width: r.width,
              height: r.height
            };
          })()
        `,
        returnByValue: true
      });

      const clip = clipRes.result.value;
      if (clip) {
        const shot = await send('Page.captureScreenshot', {
          format: 'png',
          clip: {
            x: clip.x,
            y: clip.y,
            width: clip.width,
            height: clip.height,
            scale: 1
          }
        });
        const outName = `scratch/footer-vp-${width}.png`;
        fs.writeFileSync(outName, Buffer.from(shot.data, 'base64'));
      }
    }
  }

  console.log('=== MULTI-VIEWPORT AUDIT REPORT ===');
  let allPass = true;
  for (const r of results) {
    const status = !r.hasHorizontalOverflow ? 'PASS' : 'FAIL';
    if (r.hasHorizontalOverflow) allPass = false;
    console.log(`[${status}] Viewport ${r.width}px: clientWidth=${r.clientWidth}, scrollWidth=${r.scrollWidth}, Cards: [${r.cardWidths.join(', ')}]px`);
    if (r.hasHorizontalOverflow) {
      console.log(`       Overflow items:`, r.overflowDetails);
    }
  }
  console.log('Overall responsive check:', allPass ? 'ALL 12 VIEWPORTS PASSED WITH ZERO HORIZONTAL SCROLL' : 'FAILED');

  ws.close();
  try { chromeProc.kill(); } catch {}
  server.close();
  process.exit(allPass ? 0 : 1);
});
