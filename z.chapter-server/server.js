/**
 * BUSINESS CONTEXT:
 * Server trung gian dung Puppeteer (headless Chrome that) de load
 * chapter tu sangtacviet.app, bypass duoc click-gate va session auth
 * ma vBook WebView khong xu ly duoc.
 *
 * API:
 *   GET /chapter?url=https://sangtacviet.app/truyen/...
 *   Response: JSON { ok: true, content: "<html>" }
 *           | JSON { ok: false, error: "..." }
 *
 * GET /log   POST /log   (tuong thich voi z.local_log_server)
 */

const express = require('express');
const puppeteer = require('puppeteer');

const PORT = 3001;
const BASE_URL = 'https://sangtacviet.app';

// Chrome co san tren may - khong can download Chromium rieng
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const app = express();
app.use(express.text({ type: '*/*' }));

// ─── Logging ─────────────────────────────────────────────────────────
const logs = [];
function addLog(msg) {
    const line = '[' + new Date().toISOString() + '] ' + msg;
    logs.push(line);
    if (logs.length > 200) logs.shift();
    console.log(line);
}

// POST /log  ← nhan log tu chap.js
app.post('/log', (req, res) => {
    addLog(req.body || '(empty)');
    res.send('ok');
});

// GET /logs  ← xem log qua browser
app.get('/logs', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(logs.join('\n'));
});

// ─── Puppeteer browser pool ───────────────────────────────────────────
let browser = null;
let sessionReady = false;

async function ensureBrowser() {
    if (browser && browser.isConnected()) return browser;
    addLog('[server] Launching Puppeteer...');
    browser = await puppeteer.launch({
        headless: 'new',
        executablePath: CHROME_PATH,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
            '--window-size=1280,800'
        ],
        defaultViewport: { width: 1280, height: 800 }
    });
    sessionReady = false;
    addLog('[server] Browser launched.');
    return browser;
}

async function ensureSession() {
    if (sessionReady) return;
    const br = await ensureBrowser();
    const pg = await br.newPage();
    await pg.setUserAgent('Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36');
    try {
        addLog('[server] Visiting home to establish session...');
        await pg.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 20000 });
        await new Promise(r => setTimeout(r, 3000));
        addLog('[server] Session established.');
        sessionReady = true;
    } catch (e) {
        addLog('[server] Session setup error: ' + e.message);
    } finally {
        await pg.close();
    }
}

// ─── CharMap decode (giai ma ki tu dac biet cua STV) ─────────────────
const CHAR_MAP = {
    '\u048A': 'U', '\u048B': 'p', '\u048C': 'N', '\u048D': 'e', '\u048E': 'd', '\u048F': 'u',
    '\u0490': 'P', '\u0491': 'z', '\u0492': 'j', '\u0493': 'C', '\u0494': 'H', '\u0495': 'g',
    '\u0496': 'D', '\u0497': 'y', '\u0498': 'n', '\u0499': 'm', '\u049A': 'M', '\u049B': 'c',
    '\u049C': 'O', '\u049D': 'W', '\u049E': 'T', '\u049F': 'w', '\u04A0': 'B', '\u04A1': 'A',
    '\u04A2': 'G', '\u04A3': 'Z', '\u04A4': 'Q', '\u04A5': 'v', '\u04A6': 'q', '\u04A7': 'V',
    '\u04A8': 'o', '\u04A9': 'f', '\u04AA': 'F', '\u04AB': 'Y', '\u04AC': 'J', '\u04AD': 'l',
    '\u04AE': 'k', '\u04AF': 'X', '\u04B0': 's', '\u04B1': 'L', '\u04B2': 'x', '\u04B3': 'h',
    '\u04B4': 'E', '\u04B5': 'K', '\u04B6': 'a', '\u04B7': 'R', '\u04B8': 'S', '\u04B9': 'b'
};

function decodeAndClean(html) {
    let out = '';
    for (let i = 0; i < html.length; i++) {
        out += CHAR_MAP[html[i]] || html[i];
    }
    return out
        .replace(/<i[^>]*hd[^>]*>[\s\S]*?<\/i>/gi, '')
        .replace(/<span[^>]*>[\s\S]*?<\/span>/gi, '')
        .replace(/<a[^>]*>[\s\S]*?<\/a>/gi, '')
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<center[\s\S]*?<\/center>/gi, '')
        .replace(/<button[\s\S]*?<\/button>/gi, '')
        .replace(/<p>/gi, '').replace(/<\/p>/gi, '<br>')
        .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/\n{2,}/g, '\n').replace(/^\n+/, '')
        .replace(/\n/g, '<br><br>');
}

// ─── Load chapter content ─────────────────────────────────────────────
async function loadChapterContent(chapUrl) {
    await ensureSession();
    const br = await ensureBrowser();
    const pg = await br.newPage();

    await pg.setUserAgent('Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36');

    // Intercept XHR readchapter response
    let chapContent = null;
    await pg.setRequestInterception(true);
    pg.on('request', req => req.continue());
    pg.on('response', async (resp) => {
        try {
            if (resp.url().includes('sajax=readchapter')) {
                addLog('[puppeteer] XHR readchapter response: ' + resp.status());
                const text = await resp.text();
                addLog('[puppeteer] XHR len=' + text.length + ' first80=' + text.substring(0, 80));
                const json = JSON.parse(text);
                if (json && (json.code === '0' || json.code === 0) && json.data) {
                    chapContent = json.data;
                    addLog('[puppeteer] Content captured! len=' + chapContent.length);
                } else {
                    addLog('[puppeteer] XHR code=' + json.code + ' err=' + json.err);
                }
            }
        } catch (e) { /* ignore */ }
    });

    try {
        addLog('[puppeteer] Loading: ' + chapUrl);
        await pg.goto(chapUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
        await new Promise(r => setTimeout(r, 3000));

        // Check initial state
        const initText = await pg.$eval('#maincontent', el => el.textContent.trim()).catch(() => '');
        addLog('[puppeteer] Initial state: [' + initText.substring(0, 60) + ']');

        // Trigger click-gate
        await pg.evaluate(() => {
            const mc = document.getElementById('maincontent');
            if (mc) {
                mc.click();
                mc.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            }
            if (typeof gotox === 'function') setTimeout(gotox, 300);
        });
        addLog('[puppeteer] Triggered click + gotox()');

        // Wait for content via XHR intercept OR DOM change
        const timeout = 30000;
        const start = Date.now();
        while (!chapContent && Date.now() - start < timeout) {
            await new Promise(r => setTimeout(r, 1000));

            // Also check DOM directly as fallback
            const domText = await pg.$eval('#content-container > .contentbox', el => el.textContent).catch(() => '');
            if (domText.length > 100 && !domText.includes('ang t\u1ea3i') && !domText.includes('h\u1ea5p v')) {
                addLog('[puppeteer] Content from DOM! len=' + domText.length);
                chapContent = await pg.$eval('#content-container > .contentbox', el => {
                    el.querySelectorAll('i[hd]').forEach(e => e.remove());
                    return el.innerHTML;
                }).catch(() => null);
                if (chapContent) break;
            }

            // Retry gotox if still loading
            const elapsed = Date.now() - start;
            if (elapsed > 8000 && elapsed % 8000 < 1000) {
                addLog('[puppeteer] Retry gotox()...');
                await pg.evaluate(() => { if (typeof gotox === 'function') gotox(); });
            }
        }

        if (!chapContent) {
            const finalDom = await pg.$eval('#content-container > .contentbox', el => el.innerHTML).catch(() => null);
            const finalText = await pg.$eval('#content-container > .contentbox', el => el.textContent).catch(() => '');
            addLog('[puppeteer] FAIL. finalText=[' + finalText.substring(0, 80) + ']');
            return null;
        }

        return decodeAndClean(chapContent);

    } finally {
        await pg.close();
    }
}

// ─── API endpoint ─────────────────────────────────────────────────────
app.get('/chapter', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.json({ ok: false, error: 'Missing url param' });

    addLog('[API] /chapter url=' + url);
    try {
        const content = await loadChapterContent(url);
        if (content) {
            res.json({ ok: true, content });
        } else {
            res.json({ ok: false, error: 'Content not found' });
        }
    } catch (e) {
        addLog('[API] ERROR: ' + e.message);
        res.json({ ok: false, error: e.message });
    }
});

app.get('/health', (req, res) => {
    res.json({ ok: true, sessionReady, logsCount: logs.length });
});

// ─── Start ────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', async () => {
    console.log('\n=== STV Chapter Server ===');
    console.log('PC:      http://localhost:' + PORT + '/chapter?url=...');
    console.log('Phone:   http://192.168.1.165:' + PORT + '/chapter?url=...');
    console.log('Logs:    http://localhost:' + PORT + '/logs');
    console.log('Health:  http://localhost:' + PORT + '/health\n');

    // Warm up browser in background
    ensureSession().catch(e => addLog('[init] Error: ' + e.message));
});

process.on('SIGINT', async () => {
    console.log('\nShutting down...');
    if (browser) await browser.close();
    process.exit(0);
});
