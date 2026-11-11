async function test() {
  const url = 'https://www.google.com/maps/search/?api=1&query=JSR+EV+SPARE+PARTS&query_place_id=';
  // Let's also check:
  // https://maps.google.com/?cid=... or search
  console.log('Knowledge Graph ID is: /g/11p2qwmbwv');
  console.log('Search URL: https://www.google.com/search?kgmid=/g/11p2qwmbwv&q=JSR+EV+SPARE+PARTS');
  // Can we fetch google.com/maps/place/JSR+EV+SPARE+PARTS/@28.730825,77.126488,17z
  const mapsUrl = 'https://maps.google.com/?q=28.730825,77.126488+(JSR+EV+SPARE+PARTS)';
  console.log('Clean Maps URL:', mapsUrl);
}
test();

