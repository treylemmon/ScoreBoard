// Bump this every time you change a file, or installed copies won't update.
const VERSION = "scoreboard-v8";
const FILES = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  // cache: "reload" skips the browser's HTTP cache so a new version never stores an old copy.
  e.waitUntil(caches.open(VERSION)
    .then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // The app page: always try the network first so changes show up right away; fall back to the saved copy offline.
  if (req.mode === "navigate" || req.destination === "document") {
    e.respondWith(
      fetch(req, { cache: "no-store" }).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put("index.html", copy));
        return res;
      }).catch(() => caches.match("index.html").then(r => r || caches.match("./")))
    );
    return;
  }
  // Icons and the manifest: saved copy first.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
