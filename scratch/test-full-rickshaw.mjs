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

server.listen(4192, '127.0.0.1', async () => {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const userDataDir = 'C:/Users/techn/AppData/Local/Temp/chrome-clipfull-' + Date.now();
  const port = 9252;

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

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    await send('Page.navigate', { url: 'http://127.0.0.1:4192/' });
    await new Promise(r => setTimeout(r, 1500));

    // Measure and capture footer with custom CSS that shows the FULL vehicle
    // 1. Give footer plenty of vertical height (min-height: 560px, padding: 60px 0 36px)
    // 2. Set background-size: contain so NOTHING is cropped (full roof, full body, full wheels, full parts)
    // 3. Move the green glow arc lower down so it does not cut through the wheels
    const css = `
      .site-footer {
        padding: 50px 0 36px !important;
        min-height: 540px !important;
      }
      .site-footer__bg-vehicle {
        background-size: contain !important;
        background-position: 62% center !important;
        opacity: 0.54 !important;
        -webkit-mask-image: radial-gradient(ellipse 95% 95% at 62% 50%, black 85%, transparent 100%) !important;
        mask-image: radial-gradient(ellipse 95% 95% at 62% 50%, black 85%, transparent 100%) !important;
      }
      .site-footer__glow-arc {
        height: 70px !important;
        bottom: 0px !important;
        opacity: 0.8 !important;
      }
    `;

    await send('Runtime.evaluate', {
      expression: `
        const style = document.createElement('style');
        style.textContent = \`${css}\`;
        document.head.appendChild(style);
        document.querySelectorAll('.site-footer, .site-footer *').forEach(el => el.classList.add('is-revealed'));
      `
    });

    const rectRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const f = document.querySelector('.site-footer');
          const r = f.getBoundingClientRect();
          return JSON.stringify({ x: r.x + window.scrollX, y: r.y + window.scrollY, width: r.width, height: r.height });
        })()
      `,
      returnByValue: true
    });
    const rect = JSON.parse(rectRes.result.value);

    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        scale: 1
      },
      captureBeyondViewport: true
    });
    fs.writeFileSync('C:/Users/techn/.gemini/antigravity/brain/b004bd44-88a2-4f25-ac96-38233a3ae9d5/footer-full-rickshaw-preview.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved footer-full-rickshaw-preview.png');

    ws.close();
    chromeProc.kill();
    server.close();
    process.exit(0);
  });
});

