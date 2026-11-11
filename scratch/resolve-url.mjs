async function run() {
  let url = 'https://share.google/6Zp1shhSR81Sidhjp';
  for (let i = 0; i < 10; i++) {
    console.log(`[Step ${i+1}] Checking:`, url);
    const res = await fetch(url, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    console.log('Status:', res.status);
    const loc = res.headers.get('location');
    if (loc) {
      url = new URL(loc, url).href;
      console.log('Redirecting to:', url);
    } else {
      const text = await res.text();
      const metaMatch = text.match(/content="0;\s*url=([^"]+)"/i);
      if (metaMatch) {
        url = new URL(metaMatch[1], url).href;
        console.log('Meta refresh to:', url);
      } else {
        console.log('Final URL reached:', url);
        // Look for any google maps links in text
        const mapMatches = [...text.matchAll(/https:\/\/(?:www\.)?google\.[a-z.]+\/maps[^\s"'>]*/g)];
        if (mapMatches.length) {
          console.log('Found maps links inside page:');
          mapMatches.slice(0, 5).forEach(m => console.log(' -', m[0]));
        }
        break;
      }
    }
  }
}
run();

