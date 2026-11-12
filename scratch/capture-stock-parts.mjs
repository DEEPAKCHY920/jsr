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

server.listen(4174, '127.0.0.1', async () => {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const userDataDir = 'C:/Users/techn/AppData/Local/Temp/chrome-parts-' + Date.now();
  const port = 9230;

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    'about:blank'
  ], { stdio: 'ignore' });

  for (let i = 0; i < 35; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) break;
    } catch {}
    await new Promise(r => setTimeout(r, 100));
  }

  const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
  const pages = await listRes.json();
  const wsUrl = pages[0].webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);

  let idSeq = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const id = idSeq++;
    const handler = (event) => {
      const m = JSON.parse(event.data);
      if (m.id === id) {
        ws.removeEventListener('message', handler);
        resolve(m.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('DOM.enable');

  async function capture(viewport, filename) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 2,
      mobile: viewport.mobile
    });

    await send('Page.navigate', { url: 'http://127.0.0.1:4174/' });
    await new Promise(r => setTimeout(r, 1500));

    // Scroll stock-parts into view and reveal
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('.stock-parts');
        if (el) el.scrollIntoView();
        document.querySelectorAll('.reveal-up, .reveal-stagger').forEach(e => {
          e.classList.add('is-revealed');
          e.style.opacity = '1';
          e.style.transform = 'none';
        });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    // Check overflow
    const evalRes = await send('Runtime.evaluate', {
      expression: `({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      })`,
      returnByValue: true
    });
    console.log(`Viewport ${viewport.width}x${viewport.height}:`, evalRes.result?.value);

    // Get stock-parts bounding rect
    const boxRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('.stock-parts');
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          x: rect.x + window.scrollX,
          y: rect.y + window.scrollY,
          width: rect.width,
          height: rect.height
        };
      })()`,
      returnByValue: true
    });

    const box = boxRes.result?.value;
    if (box) {
      console.log(`Clip box for ${viewport.width}px:`, box);
      const clip = {
        x: Math.max(0, box.x - 10),
        y: Math.max(0, box.y - 10),
        width: box.width + 20,
        height: box.height + 20,
        scale: 1
      };
      const ssRes = await send('Page.captureScreenshot', { format: 'png', clip });
      const outPath = path.join('C:/Users/techn/.gemini/antigravity/brain/b004bd44-88a2-4f25-ac96-38233a3ae9d5', filename);
      fs.writeFileSync(outPath, Buffer.from(ssRes.data, 'base64'));
      console.log(`Saved screenshot: ${outPath}`);
    }
  }

  await capture({ width: 1280, height: 900, mobile: false }, 'screenshot-stock-parts-1280.png');
  await capture({ width: 390, height: 844, mobile: true }, 'screenshot-stock-parts-390.png');
  await capture({ width: 360, height: 740, mobile: true }, 'screenshot-stock-parts-360.png');

  ws.close();
  chromeProc.kill();
  server.close();
  process.exit(0);
});
