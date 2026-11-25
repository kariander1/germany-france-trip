// Offline support. Site files: network first (so updates arrive), cache as fallback.
// Photos, fonts, map tiles, libraries: cache first. Bump VER when the file list changes.
const VER = `trip-v1`;
const CORE = [`./`, `index.html`, `story.html`, `style.css`, `app.js`, `store.js`, `data.js`, `geo.js`, `images.js`,
  `i18n.js`, `i18n-en.js`, `when.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`];
const CDN = [`https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css`,
  `https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js`,
  `https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&family=Rubik:wght@400;500;700;800&family=Suez+One&display=swap`];
const RT = `trip-rt`; // runtime cache (images, fonts, tiles) — kept across versions

self.addEventListener(`install`, e => {
  e.waitUntil((async () => {
    const c = await caches.open(VER);
    await c.addAll(CORE);
    await Promise.all(CDN.map(u => c.add(u).catch(() => {})));
    // trip photos, so the plan has its pictures offline
    try {
      self.window = self; importScripts(`images.js`);
      const r = await caches.open(RT);
      await Promise.all(Object.values(self.IMG || {}).map(async u => {
        if (await r.match(u)) return;
        try { const res = await fetch(u, { mode: `cors` }); if (res.ok) await r.put(u, res); } catch (er) {}
      }));
    } catch (er) {}
    self.skipWaiting();
  })());
});

self.addEventListener(`activate`, e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VER && k !== RT) await caches.delete(k);
    await self.clients.claim();
  })());
});

const LIVE = /api\.github\.com|open-meteo\.com/; // sync & weather: never from cache here

self.addEventListener(`fetch`, e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== `GET` || LIVE.test(url.host)) return;

  if (url.origin === location.origin) {
    // network first, fall back to cache (ignore ?lang=, ?start= etc.)
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res.ok) { const c = await caches.open(VER); c.put(url.pathname === new URL(`./`, location).pathname ? `./` : req, res.clone()); }
        return res;
      } catch (er) {
        const c = await caches.open(VER);
        return (await c.match(req, { ignoreSearch: true })) ||
          (req.mode === `navigate` ? (await c.match(url.pathname.endsWith(`story.html`) ? `story.html` : `index.html`)) : undefined) ||
          Response.error();
      }
    })());
    return;
  }

  // cross-origin: cache first
  e.respondWith((async () => {
    const hit = (await caches.match(req.url)) || (await caches.match(req));
    if (hit) return hit;
    try {
      let res;
      if (req.destination === `image`) { try { res = await fetch(req.url, { mode: `cors` }); } catch (er) {} }
      if (!res || !res.ok) res = await fetch(req);
      if (res.ok || res.type === `opaque`) { const c = await caches.open(RT); c.put(req.url, res.clone()); }
      return res;
    } catch (er) { return Response.error(); }
  })());
});
