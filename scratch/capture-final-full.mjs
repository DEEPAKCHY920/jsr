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

server.listen(4193, '127.0.0.1', async () => {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const userDataDir = 'C:/Users/techn/AppData/Local/Temp/chrome-finalfoot-' + Date.now();
  const port = 9253;

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

  ws.addEventListener('open', async () => {
    await send('Page.enable');
    await send('DOM.enable');

    // 1. Desktop 1280 x 780
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 780,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await send('Page.navigate', { url: 'http://127.0.0.1:4193/' });
    await new Promise(r => setTimeout(r, 1500));

    // Scroll to the bottom with scroll events so reveal animations trigger
    await send('Runtime.evaluate', {
      expression: `
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, document.body.scrollHeight);
        window.dispatchEvent(new Event('scroll'));
        document.querySelectorAll('.site-footer, .site-footer *').forEach(el => el.classList.add('is-revealed'));
      `
    });
    await new Promise(r => setTimeout(r, 800));

    const shotDesktop = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/techn/.gemini/antigravity/brain/b004bd44-88a2-4f25-ac96-38233a3ae9d5/footer-full-erickshaw-desktop.png', Buffer.from(shotDesktop.data, 'base64'));
    console.log('Saved footer-full-erickshaw-desktop.png');

    // 2. Mobile 390 x 844
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await send('Page.navigate', { url: 'http://127.0.0.1:4193/' });
    await new Promise(r => setTimeout(r, 1500));

    await send('Runtime.evaluate', {
      expression: `
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, document.body.scrollHeight);
        window.dispatchEvent(new Event('scroll'));
        document.querySelectorAll('.site-footer, .site-footer *').forEach(el => el.classList.add('is-revealed'));
      `
    });
    await new Promise(r => setTimeout(r, 800));

    const shotMobile = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/techn/.gemini/antigravity/brain/b004bd44-88a2-4f25-ac96-38233a3ae9d5/footer-full-erickshaw-mobile.png', Buffer.from(shotMobile.data, 'base64'));
    console.log('Saved footer-full-erickshaw-mobile.png');

    // Overflow check
    const ovCheck = await send('Runtime.evaluate', {
      expression: `
        JSON.stringify({
          docScrollWidth: document.documentElement.scrollWidth,
          docClientWidth: document.documentElement.clientWidth
        });
      `,
      returnByValue: true
    });
    console.log('Overflow check:', ovCheck.result.value);

    ws.close();
    chromeProc.kill();
    server.close();
    process.exit(0);
  });
});

