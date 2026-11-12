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

server.listen(4187, '127.0.0.1', async () => {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const userDataDir = 'C:/Users/techn/AppData/Local/Temp/chrome-footertest-' + Date.now();
  const port = 9247;

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

    // Desktop
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await send('Page.navigate', { url: 'http://127.0.0.1:4187/' });
    await new Promise(r => setTimeout(r, 1500));

    // Scroll all the way down
    await send('Runtime.evaluate', {
      expression: `
        window.scrollTo(0, document.body.scrollHeight);
      `
    });
    await new Promise(r => setTimeout(r, 1000));

    // Also trigger scroll events & add is-revealed if needed
    await send('Runtime.evaluate', {
      expression: `
        window.dispatchEvent(new Event('scroll'));
        document.querySelectorAll('.site-footer, .site-footer *').forEach(el => {
          el.classList.add('is-revealed');
        });
      `
    });
    await new Promise(r => setTimeout(r, 500));

    // Measure footer position in current viewport
    const rectRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const f = document.querySelector('.site-footer');
          f.scrollIntoView({ block: 'start' });
          const r = f.getBoundingClientRect();
          return JSON.stringify({ y: r.y, height: r.height, top: window.scrollY });
        })()
      `,
      returnByValue: true
    });
    console.log('Scrolled footer rect:', rectRes.result.value);
    await new Promise(r => setTimeout(r, 600));

    // Take screenshot of viewport
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/techn/.gemini/antigravity/brain/b004bd44-88a2-4f25-ac96-38233a3ae9d5/footer-scrolled-desktop.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved footer-scrolled-desktop.png');

    // Now scroll specifically to the vehicle image
    await send('Runtime.evaluate', {
      expression: `
        const v = document.querySelector('.site-footer__vehicle-fullwidth');
        if (v) v.scrollIntoView({ block: 'center' });
      `
    });
    await new Promise(r => setTimeout(r, 600));

    const shotVehicle = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/techn/.gemini/antigravity/brain/b004bd44-88a2-4f25-ac96-38233a3ae9d5/footer-vehicle-view.png', Buffer.from(shotVehicle.data, 'base64'));
    console.log('Saved footer-vehicle-view.png');

    // Mobile
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await send('Page.navigate', { url: 'http://127.0.0.1:4187/' });
    await new Promise(r => setTimeout(r, 1500));

    await send('Runtime.evaluate', {
      expression: `
        const v = document.querySelector('.site-footer__vehicle-fullwidth');
        if (v) v.scrollIntoView({ block: 'center' });
        document.querySelectorAll('.site-footer, .site-footer *').forEach(el => el.classList.add('is-revealed'));
      `
    });
    await new Promise(r => setTimeout(r, 600));

    const shotMobileVehicle = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/techn/.gemini/antigravity/brain/b004bd44-88a2-4f25-ac96-38233a3ae9d5/footer-vehicle-mobile.png', Buffer.from(shotMobileVehicle.data, 'base64'));
    console.log('Saved footer-vehicle-mobile.png');

    ws.close();
    chromeProc.kill();
    server.close();
    process.exit(0);
  });
});

