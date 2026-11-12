import http from 'http';
import fs from 'fs';
import { spawn } from 'child_process';

const server = http.createServer((req, res) => {
  if (req.url === '/img') {
    res.writeHead(200, { 'Content-Type': 'image/webp' });
    fs.createReadStream('d:/jsr/frontend/public/footer-erickshaw.webp').pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
<html>
<body style="margin:0; background:#071B36; display:flex; justify-content:center; align-items:center; min-height:100vh;">
  <img id="img" src="/img" style="width:1200px; max-width:100%; height:auto; display:block;" />
</body>
</html>`);
  }
});

server.listen(4899, '127.0.0.1', async () => {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const userDataDir = 'C:/Users/techn/AppData/Local/Temp/chrome-inspect-' + Date.now();
  const port = 9240;

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    'about:blank'
  ], { stdio: 'ignore' });

  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) break;
    } catch (e) {}
    await new Promise(r => setTimeout(r, 200));
  }

  const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
  const pages = await listRes.json();
  const pageWsUrl = pages[0].webSocketDebuggerUrl;

  const { WebSocket } = await import('ws');
  const ws = new WebSocket(pageWsUrl);

  let id = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const curId = id++;
    const handler = (data) => {
      const msg = JSON.parse(data.toString());
      if (msg.id === curId) {
        ws.off('message', handler);
        resolve(msg.result);
      }
    };
    ws.on('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  ws.on('open', async () => {
    await send('Page.enable');
    await send('DOM.enable');
    await send('Page.navigate', { url: 'http://127.0.0.1:4899/' });

    await new Promise(r => setTimeout(r, 1000));

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false,
    });

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/techn/.gemini/antigravity/brain/b004bd44-88a2-4f25-ac96-38233a3ae9d5/footer-erickshaw-original.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved original footer image screenshot');

    ws.close();
    chromeProc.kill();
    server.close();
    process.exit(0);
  });
});

