import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const server = http.createServer((req, res) => {
  if (req.url === '/img') {
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    fs.createReadStream('d:/jsr/frontend/public/footer-rickshaw-bg.jpg').pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html><html><body><canvas id="c"></canvas></body></html>`);
  }
});

server.listen(4194, '127.0.0.1', async () => {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const userDataDir = 'C:/Users/techn/AppData/Local/Temp/chrome-conv-' + Date.now();
  const port = 9254;

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
  const ws = new WebSocket(pages[0].webSocketDebuggerUrl);

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
    await send('Page.navigate', { url: 'http://127.0.0.1:4194/' });
    await new Promise(r => setTimeout(r, 500));

    const webpDataRes = await send('Runtime.evaluate', {
      expression: `
        new Promise((resolve) => {
          const img = new Image();
          img.src = '/img';
          img.onload = () => {
            const canvas = document.getElementById('c');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/webp', 0.9);
            resolve(dataUrl);
          };
        })
      `,
      awaitPromise: true,
      returnByValue: true
    });

    const base64 = webpDataRes.result.value.replace(/^data:image\/webp;base64,/, '');
    fs.writeFileSync('d:/jsr/frontend/public/footer-rickshaw-bg.webp', Buffer.from(base64, 'base64'));
    console.log('Saved d:/jsr/frontend/public/footer-rickshaw-bg.webp, size:', fs.statSync('d:/jsr/frontend/public/footer-rickshaw-bg.webp').size);

    ws.close();
    chromeProc.kill();
    server.close();
    process.exit(0);
  });
});

