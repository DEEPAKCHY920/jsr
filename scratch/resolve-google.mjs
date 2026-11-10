async function findMapsUrl() {
  const url = 'https://share.google/6Zp1shhSR81Sidhjp';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  console.log('Final URL:', res.url);
  const text = await res.text();
  const mapsMatches = [...text.matchAll(/https:\/\/(?:maps\.google\.com|www\.google\.com\/maps)[^"'\s<>]+/g)].map(m => m[0]);
  console.log('Maps links count:', mapsMatches.length);
  console.log('Maps links found:', [...new Set(mapsMatches)].slice(0, 10));
}
findMapsUrl();

