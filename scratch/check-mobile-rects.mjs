import { spawn } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9274;
const proc = spawn(chromePath, ['--headless=new', '--remote-debugging-port=' + port, '--disable-gpu', 'about:blank'], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 1500));
const list = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json();
const ws = new WebSocket(list[0].webSocketDebuggerUrl);
let id = 1;
const send = (m, p = {}) => new Promise(res => {
  const curId = id++;
  const h = e => { const msg = JSON.parse(e.data); if (msg.id === curId) { ws.removeEventListener('message', h); res(msg.result); }};
  ws.addEventListener('message', h);
  ws.send(JSON.stringify({ id: curId, method: m, params: p }));
});

ws.addEventListener('open', async () => {
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 2, mobile: true });
  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await new Promise(r => setTimeout(r, 1500));
  const rects = await send('Runtime.evaluate', {
    expression: `(() => {
      const getR = sel => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const footerTop = document.querySelector('.site-footer').getBoundingClientRect().top;
        return { relTop: Math.round(r.top - footerTop), relBottom: Math.round(r.bottom - footerTop), height: Math.round(r.height) };
      };
      return {
        brand: getR('.site-footer__col--brand'),
        services: getR('.site-footer__services-grid'),
        accordion: getR('.site-footer__accordion-card'),
        bgText: getR('.site-footer__bg-text')
      };
    })()`,
    returnByValue: true
  });
  console.log('Mobile Rects:', JSON.stringify(rects.result.value, null, 2));
  ws.close();
  proc.kill();
  process.exit(0);
});

