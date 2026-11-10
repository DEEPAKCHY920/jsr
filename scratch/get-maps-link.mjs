import http from 'http';
import { spawn } from 'child_process';

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const userDataDir = 'C:/Users/techn/AppData/Local/Temp/chrome-google-' + Date.now();
const port = 9226;

const chromeProc = spawn(chromePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${userDataDir}`,
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  'about:blank'
], { stdio: 'ignore' });

async function waitForChrome(retries = 35) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return await res.json();
    } catch (e) {
      await new Promise(r => setTimeout(r, 200));
    }
  }
  throw new Error(`Chrome did not respond on port ${port}`);
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
  }
  async connect() {
    return new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
    });
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}

async function run() {
  try {
    await waitForChrome();
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const pageTarget = list.find(t => t.type === 'page') || list[0];
    const client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Page.navigate', { url: 'https://share.google/6Zp1shhSR81Sidhjp' });
    await new Promise(r => setTimeout(r, 5000));

    const evalRes = await client.send('Runtime.evaluate', {
      expression: `
        (() => {
          const links = Array.from(document.querySelectorAll('a')).map(a => a.href);
          const maps = links.filter(h => h.includes('google.com/maps') || h.includes('maps.google'));
          return { currentUrl: window.location.href, mapsLinks: maps };
        })()
      `,
      returnByValue: true
    });

    console.log('EVAL_RESULT:', JSON.stringify(evalRes.result.value, null, 2));
  } catch(e) {
    console.error('Error:', e);
  } finally {
    chromeProc.kill('SIGKILL');
  }
}

run();

