import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\techn\\AppData\\Local\\Temp\\chrome-accordion-' + Date.now();
const port = 9268;

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

try {
  const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const ws = new WebSocket(list[0].webSocketDebuggerUrl);

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
    await send('Runtime.enable');
    await send('DOM.enable');

    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 900,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await send('Page.navigate', { url: 'http://localhost:5173/' });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to footer and ensure reveal classes
    await send('Runtime.evaluate', {
      expression: `
        document.querySelector('.site-footer').scrollIntoView();
        document.querySelectorAll('.site-footer, .site-footer *').forEach(el => el.classList.add('is-revealed'));
      `
    });
    await new Promise(r => setTimeout(r, 500));

    // Step 1: Check initial status
    const initialStatus = await send('Runtime.evaluate', {
      expression: `(() => {
        const linksPanel = document.getElementById('footer-panel-links');
        const contactPanel = document.getElementById('footer-panel-contact');
        return {
          linksOpen: linksPanel ? linksPanel.classList.contains('site-footer__accordion-content--open') : false,
          linksDisplay: linksPanel ? window.getComputedStyle(linksPanel).display : 'null',
          contactOpen: contactPanel ? contactPanel.classList.contains('site-footer__accordion-content--open') : false,
          contactDisplay: contactPanel ? window.getComputedStyle(contactPanel).display : 'null',
        };
      })()`,
      returnByValue: true
    });
    console.log('Initial Status:', initialStatus.result.value);

    // Step 2: Click Quick Links button
    const clickLinks = await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('button[aria-controls=\"footer-panel-links\"]');
        if (!btn) return 'NO BTN';
        btn.click();
        return 'CLICKED';
      })()`,
      returnByValue: true
    });
    console.log('Click Links result:', clickLinks.result.value);
    await new Promise(r => setTimeout(r, 500));

    // Check status after clicking Links
    const afterLinksClick = await send('Runtime.evaluate', {
      expression: `(() => {
        const linksPanel = document.getElementById('footer-panel-links');
        return {
          linksOpen: linksPanel.classList.contains('site-footer__accordion-content--open'),
          linksDisplay: window.getComputedStyle(linksPanel).display
        };
      })()`,
      returnByValue: true
    });
    console.log('After Links Click Status:', afterLinksClick.result.value);

    // Capture screenshot with Quick Links opened
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:/Users/techn/.gemini/antigravity/brain/b004bd44-88a2-4f25-ac96-38233a3ae9d5/accordion-links-open.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved accordion-links-open.png');

    // Step 3: Click Contact button to collapse it
    const clickContact = await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('button[aria-controls=\"footer-panel-contact\"]');
        if (!btn) return 'NO BTN';
        btn.click();
        return 'CLICKED';
      })()`,
      returnByValue: true
    });
    console.log('Click Contact result:', clickContact.result.value);
    await new Promise(r => setTimeout(r, 500));

    const afterContactClick = await send('Runtime.evaluate', {
      expression: `(() => {
        const contactPanel = document.getElementById('footer-panel-contact');
        return {
          contactOpen: contactPanel.classList.contains('site-footer__accordion-content--open'),
          contactDisplay: window.getComputedStyle(contactPanel).display
        };
      })()`,
      returnByValue: true
    });
    console.log('After Contact Click Status:', afterContactClick.result.value);

    ws.close();
    chromeProc.kill();
    process.exit(0);
  });
} catch (e) {
  console.error(e);
  chromeProc.kill();
  process.exit(1);
}

