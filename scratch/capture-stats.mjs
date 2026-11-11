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

server.listen(4173, '127.0.0.1', async () => {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const userDataDir = 'C:/Users/techn/AppData/Local/Temp/chrome-stats-' + Date.now();
  const port = 9229;

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
    } catch(e) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const target = list.find(t => t.type === 'page') || list[0];
  const ws = new WebSocket(target.webSocketDebuggerUrl);

  await new Promise(r => ws.onopen = r);

  let reqId = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const id = reqId++;
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

  await send('Page.enable');
  await send('DOM.enable');

  // Desktop 1280px
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 700,
    deviceScaleFactor: 1,
    mobile: false
  });
  await send('Page.navigate', { url: 'http://127.0.0.1:4173/' });
  await new Promise(r => setTimeout(r, 1500));

  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('.stats-strip');
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()
    `
  });
  await new Promise(r => setTimeout(r, 1500));

  const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
  const artifactDir = 'C:/Users/techn/.gemini/antigravity/brain/b004bd44-88a2-4f25-ac96-38233a3ae9d5';
  fs.writeFileSync(path.join(artifactDir, 'screenshot-stats-1280.png'), Buffer.from(desktopShot.data, 'base64'));

  // Mobile 390px
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Page.navigate', { url: 'http://127.0.0.1:4173/' });
  await new Promise(r => setTimeout(r, 1500));

  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('.stats-strip');
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()
    `
  });
  await new Promise(r => setTimeout(r, 1500));

  const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'screenshot-stats-390.png'), Buffer.from(mobileShot.data, 'base64'));

  console.log('Viewport screenshots captured successfully!');
  chromeProc.kill('SIGKILL');
  server.close();
  try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch(e) {}
});
