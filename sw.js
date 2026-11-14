// Preclinicians service worker: makes the app installable and usable offline.
// Bump V on each deploy if you change icons or manifest. index.html itself is always fetched fresh when online.
const V = 'pc-v323';
const SHELL = ['/', '/manifest.json', '/icons/icon-192.png', '/icons/icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
async function netFirst(req, key) {
  const c = await caches.open(V);
  try { const r = await fetch(req); if (r && r.ok) c.put(key || req, r.clone()); return r; }
  catch (err) { const m = await c.match(key || req); if (m) return m; throw err; }
}
async function swr(req) {
  const c = await caches.open(V), m = await c.match(req);
  const p = fetch(req).then(r => { if (r && r.ok) c.put(req, r.clone()); return r; }).catch(() => m);
  return m || p;
}
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin === location.origin) {
    if (r.mode === 'navigate') return e.respondWith(netFirst(r, '/'));
    if (u.pathname === '/api/config') return e.respondWith(netFirst(r));
    if (u.pathname.startsWith('/api/')) return;           // payments and verification are never cached
    return e.respondWith(swr(r));
  }
  if (u.hostname === 'cdn.jsdelivr.net' && u.pathname.indexOf('supabase-js') > -1) e.respondWith(swr(r));
});
